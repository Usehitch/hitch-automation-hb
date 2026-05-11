/**
 * Generates a unique mailinator email address for each test run.
 * Inbox is publicly viewable at https://mailinator.com/v4/public/inboxes.jsp?to=<alias>
 */
export const randomEmail = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 7);
    return `test.${random}.${timestamp}@mailinator.com`;
};
