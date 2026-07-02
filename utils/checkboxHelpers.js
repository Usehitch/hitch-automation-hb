import { expect } from '@playwright/test';

/**
 * Checks every enabled, unchecked checkbox in the given locator set.
 * Uses el.click() via evaluate to reliably trigger MUI synthetic events.
 *
 * @param {import('@playwright/test').Locator} checkboxes
 */
export async function checkAllCheckboxes(checkboxes) {
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        try {
            // Explicit timeouts: with none, these queries wait forever for the
            // element to attach — when a containing dialog unmounts mid-loop
            // (prod's My Loans background refresh closes the certification
            // modal) an unbounded isDisabled() eats the entire test timeout.
            if (await checkbox.isDisabled({ timeout: 5000 })) continue;
            if (await checkbox.isChecked({ timeout: 5000 })) continue;
            await checkbox.scrollIntoViewIfNeeded({ timeout: 5000 });
            await checkbox.evaluate(el => el.click());
        } catch {
            // Element was detached from DOM (modal re-rendered between steps) — skip it.
            // The re-render means MUI rebuilt the list; the checkbox is either already
            // checked in the new tree or no longer required.
        }
    }
}

/**
 * Reliably checks a single MUI checkbox.
 *
 * MUI's visually-hidden <input> sometimes ignores Playwright's .check() (the
 * forced click lands on a 0-size element and the state never flips — surfaced
 * as "Clicking the checkbox did not change its state"). el.click() via
 * evaluate() fires the synthetic React event directly; clicking the visible
 * label text and Playwright's .check({ force: true }) are fallbacks. Throws if
 * the checkbox is still unchecked after all strategies.
 *
 * @param {import('@playwright/test').Locator} checkbox
 * @param {{ page?: import('@playwright/test').Page, label?: string }} [opts]
 *   page + label enable the label-text fallback when the direct click fails.
 */
export async function ensureChecked(checkbox, { page, label } = {}) {
    const name = label ?? 'checkbox';

    if (await checkbox.isChecked().catch(() => false)) return;

    await checkbox.scrollIntoViewIfNeeded().catch(() => { });

    if (!(await checkbox.isChecked().catch(() => false))) {
        await checkbox.evaluate(el => el.click()).catch(() => { });
    }

    if (!(await checkbox.isChecked().catch(() => false)) && page && label) {
        await page.getByText(label, { exact: true }).first().click({ force: true }).catch(() => { });
    }

    if (!(await checkbox.isChecked().catch(() => false))) {
        await checkbox.check({ force: true }).catch(() => { });
    }

    await expect(checkbox, `Failed to check "${name}"`).toBeChecked();
}
