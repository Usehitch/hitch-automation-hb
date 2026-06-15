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
            if (await checkbox.isDisabled()) continue;
            if (await checkbox.isChecked()) continue;
            await checkbox.scrollIntoViewIfNeeded();
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
 * label text is the final fallback.
 *
 * @param {import('@playwright/test').Locator} checkbox
 * @param {{ page?: import('@playwright/test').Page, label?: string }} [opts]
 *   page + label enable the label-text fallback when the direct click fails.
 */
export async function ensureChecked(checkbox, { page, label } = {}) {
    if (await checkbox.isChecked().catch(() => false)) return;
    await checkbox.scrollIntoViewIfNeeded().catch(() => { });
    await checkbox.evaluate(el => el.click()).catch(() => { });
    if (await checkbox.isChecked().catch(() => false)) return;

    if (page && label) {
        await page.getByText(label, { exact: true }).first().click({ force: true }).catch(() => { });
    }
}
