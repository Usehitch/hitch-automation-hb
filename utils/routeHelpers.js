/**
 * Intercepts processApplication requests and auto-retries on HTTP 500
 * (up to 3 attempts, 3s back-off) before the UI sees the error.
 * Guarantees unroute even if fn() throws.
 *
 * @param {import('@playwright/test').Page} page
 * @param {() => Promise<void>} fn  async work to run while the route is active
 */
export async function withProcessAppRetry(page, fn) {
    const handler = async (route) => {
        let response;
        for (let attempt = 0; attempt < 3; attempt++) {
            response = await route.fetch();
            if (response.status() !== 500) break;
            if (attempt < 2) await new Promise(r => setTimeout(r, 3000));
        }
        await route.fulfill({ response });
    };

    await page.route('**/processApplication**', handler);
    try {
        await fn();
    } finally {
        await page.unroute('**/processApplication**', handler).catch(() => {});
    }
}
