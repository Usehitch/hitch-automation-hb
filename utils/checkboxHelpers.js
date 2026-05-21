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
