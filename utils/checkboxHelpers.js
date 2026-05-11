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
        if (await checkbox.isDisabled()) continue;
        if (await checkbox.isChecked()) continue;
        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.evaluate(el => el.click());
    }
}
