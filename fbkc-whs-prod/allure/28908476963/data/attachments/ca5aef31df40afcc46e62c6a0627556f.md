# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Borrower Flow/support.spec.js >> Support — Help Desk Widget >> Loan officer can access the help desk widget (AI bot + submit ticket)
- Location: tests/Borrower Flow/support.spec.js:34:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByText(/Ask a question|Ask the bot|Fin|AI|instant answer|How can we help|Start a conversation|Chat with us/i).first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/Ask a question|Ask the bot|Fin|AI|instant answer|How can we help|Start a conversation|Chat with us/i).first()
    9 × locator resolved to <div class="tooltip cookies">…</div>
      - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e5]:
    - generic [ref=e8]:
      - list [ref=e10]:
        - listitem [ref=e11]:
          - button "logo":
            - generic:
              - generic:
                - img "logo"
          - button "Toggle Sidebar" [ref=e12] [cursor=pointer]:
            - img
            - generic [ref=e13]: Toggle Sidebar
        - listitem [ref=e14]:
          - generic [ref=e15]: Farmers Bank of Kansas City
      - list [ref=e19]:
        - listitem [ref=e20]:
          - button "My Loans Chevron down" [ref=e22] [cursor=pointer]:
            - img [ref=e23]
            - text: My Loans
            - img [ref=e26]
            - generic [ref=e28]: Chevron down
        - listitem [ref=e29]:
          - button "Release Notes" [ref=e31] [cursor=pointer]:
            - img [ref=e32]
            - text: Release Notes
      - list [ref=e38]:
        - listitem [ref=e39]:
          - button "HF HELIX FBKC TestMLO prod_helix_fbkc_mlo@homebridge.com" [ref=e40] [cursor=pointer]:
            - generic [ref=e42]: HF
            - generic [ref=e43]:
              - paragraph [ref=e44]: HELIX FBKC TestMLO
              - paragraph [ref=e45]: prod_helix_fbkc_mlo@homebridge.com
            - img [ref=e46]
    - main [ref=e50]:
      - generic [ref=e51]:
        - generic [ref=e52]:
          - heading "My Loans" [level=1] [ref=e53]
          - generic [ref=e54]:
            - button "Sharable App Link" [ref=e55] [cursor=pointer]:
              - img
              - text: Sharable App Link
            - button "Start App" [ref=e56] [cursor=pointer]:
              - img
              - text: Start App
        - generic [ref=e57]:
          - heading "Overview" [level=2] [ref=e59]
          - generic [ref=e60]:
            - generic [ref=e62]:
              - generic [ref=e64]: My Loans
              - generic [ref=e65]:
                - generic [ref=e66]: "0"
                - generic [ref=e67]: / $0
            - generic [ref=e69]:
              - generic [ref=e70]:
                - img [ref=e72]
                - generic [ref=e77]: Pre-Qual
              - generic [ref=e78]:
                - generic [ref=e79]: "0"
                - generic [ref=e80]: / $0
            - generic [ref=e82]:
              - generic [ref=e83]:
                - img [ref=e85]
                - generic [ref=e87]: In Process
              - generic [ref=e88]:
                - generic [ref=e89]: "0"
                - generic [ref=e90]: / $0
            - generic [ref=e92]:
              - generic [ref=e93]:
                - img [ref=e95]
                - generic [ref=e97]: Closing
              - generic [ref=e98]:
                - generic [ref=e99]: "0"
                - generic [ref=e100]: / $0
            - generic [ref=e102]:
              - generic [ref=e103]:
                - img [ref=e105]
                - generic [ref=e107]: Funded
              - generic [ref=e108]:
                - generic [ref=e109]: "0"
                - generic [ref=e110]: / $0
        - generic [ref=e111]:
          - generic [ref=e112]:
            - generic [ref=e113]:
              - generic [ref=e114]:
                - img [ref=e115]
                - textbox "Search by email, name, full address or loan number" [ref=e118]
              - button "Filter" [ref=e120] [cursor=pointer]:
                - img
                - text: Filter
            - tablist "View mode" [ref=e121]:
              - tab "List" [selected] [ref=e122] [cursor=pointer]:
                - img [ref=e124]
                - text: List
          - generic [ref=e125]:
            - generic [ref=e126]:
              - button "1 Pre-Qual 0 applications / $0" [ref=e127] [cursor=pointer]:
                - generic [ref=e128]:
                  - generic [ref=e129]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e130]
                  - generic [ref=e131]: 0 applications / $0
                - img [ref=e132]
              - generic [ref=e135]:
                - table [ref=e137]:
                  - rowgroup [ref=e138]:
                    - row "Applicant Property Address Loan Amount Processor / LOA Time in Stage" [ref=e139]:
                      - columnheader "Applicant" [ref=e140]:
                        - generic [ref=e141]: Applicant
                      - columnheader "Property Address" [ref=e142]:
                        - generic [ref=e143]: Property Address
                      - columnheader "Loan Amount" [ref=e144]:
                        - generic [ref=e145]: Loan Amount
                      - columnheader "Processor / LOA" [ref=e146]:
                        - generic [ref=e147]: Processor / LOA
                      - columnheader "Time in Stage" [ref=e148]:
                        - generic [ref=e149]: Time in Stage
                      - columnheader [ref=e150]
                  - rowgroup [ref=e151]:
                    - row "No results" [ref=e152]:
                      - cell "No results" [ref=e153]:
                        - paragraph [ref=e155]: No results
                - generic [ref=e156]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e157] [cursor=pointer]
                  - button "Next" [disabled]:
                    - text: Next
                    - img
            - button "2 In Process 0 applications / $0" [ref=e159] [cursor=pointer]:
              - generic [ref=e160]:
                - generic [ref=e161]: "2"
                - heading "In Process" [level=3] [ref=e162]
                - generic [ref=e163]: 0 applications / $0
              - img [ref=e164]
            - button "3 Closing 0 applications / $0" [ref=e167] [cursor=pointer]:
              - generic [ref=e168]:
                - generic [ref=e169]: "3"
                - heading "Closing" [level=3] [ref=e170]
                - generic [ref=e171]: 0 applications / $0
              - img [ref=e172]
            - button "4 Funded 0 applications / $0" [ref=e175] [cursor=pointer]:
              - generic [ref=e176]:
                - generic [ref=e177]: "4"
                - heading "Funded" [level=3] [ref=e178]
                - generic [ref=e179]: 0 applications / $0
              - img [ref=e180]
  - alert [ref=e182]
  - iframe [active] [ref=e183]:
    - generic [ref=f14e1]:
      - dialog "Messaging window" [ref=f14e2]:
        - generic [ref=f14e3]:
          - region [ref=f14e5]:
            - heading "Farmers HELOC Partner Suppport" [level=2] [ref=f14e6]
            - paragraph [ref=f14e7]: Ask us anything
          - generic [ref=f14e8]:
            - button "Options menu" [ref=f14e11] [cursor=pointer]:
              - img [ref=f14e12]
            - button "Close" [ref=f14e17] [cursor=pointer]:
              - img [ref=f14e18]
          - generic:
            - alert
        - generic [ref=f14e20]:
          - log [ref=f14e22]:
            - paragraph [ref=f14e24]:
              - text: This chat is recorded using a cloud service and is subject to the terms of our
              - link "Privacy Notice(opens in a new tab)" [ref=f14e26] [cursor=pointer]:
                - /url: https://www.farmersbankks.com/Privacy-Policy/
                - text: Privacy Notice
                - img "(opens in a new tab)" [ref=f14e27]
              - text: .
            - paragraph [ref=f14e30]: 12:31 AM
            - generic [ref=f14e31]:
              - paragraph [ref=f14e33]: Harper AI Bot
              - generic [ref=f14e36]:
                - generic [ref=f14e37]: "Harper AI Bot says:"
                - generic [ref=f14e38]: Hello! I'm Harper, the Homebridge HELOC AI Assistant. How can I help you today? You can ask me about our products or ask to speak with a live agent.
            - generic [ref=f14e39]:
              - figure [ref=f14e41]
              - generic [ref=f14e44]:
                - generic [ref=f14e45]: "Harper AI Bot says:"
                - generic [ref=f14e46]: "I'm sorry, it's outside of our regular business hours. If you wish to speak with a Live Agent, we're open from 9am to 8pm Eastern. Please choose an available option below:"
              - paragraph [ref=f14e51]: Just now
            - list [ref=f14e54]:
              - listitem [ref=f14e55]:
                - button "Submit ticket" [ref=f14e56] [cursor=pointer]
              - listitem [ref=f14e57]:
                - button "Continue w/AI" [ref=f14e58] [cursor=pointer]
          - generic [ref=f14e60]:
            - generic [ref=f14e61]:
              - button "Upload file" [ref=f14e62] [cursor=pointer]:
                - img [ref=f14e63]
              - region [ref=f14e65]:
                - generic [ref=f14e66]:
                  - generic [ref=f14e67]: Type a message
                  - textbox "Type a message" [active] [ref=f14e68]
            - generic [ref=f14e69]:
              - img [ref=f14e70]
              - 'link "Built with Zendesk: Visit the Zendesk website in a new tab" [ref=f14e72] [cursor=pointer]':
                - /url: https://www.zendesk.com/service/messaging/?utm_source=webwidgetmessagingweb&utm_medium=webwidgetmessaging&utm_campaign=poweredbyzendesk&utm_content=https://fbkc-prod-pos.onrender.com/portal
                - img [ref=f14e73]
      - status [ref=f14e75]
```

# Test source

```ts
  27  |     // getByText do not cross frame boundaries, so we scan every frame.
  28  |     // -------------------------------------------------------------------------
  29  | 
  30  |     /** Find a control by role + accessible name in ANY frame; null if absent. */
  31  |     async #findByRoleInAnyFrame(role, nameRe, { timeout = 20000 } = {}) {
  32  |         let found = null;
  33  |         await expect.poll(async () => {
  34  |             for (const frame of this.page.frames()) {
  35  |                 const loc = frame.getByRole(role, { name: nameRe });
  36  |                 if (await loc.count().catch(() => 0) > 0) { found = loc.first(); return true; }
  37  |             }
  38  |             return false;
  39  |         }, { timeout, intervals: [500, 1000, 2000] }).toBe(true);
  40  |         return found;
  41  |     }
  42  | 
  43  |     /** Find text in ANY frame; null if absent. */
  44  |     async #findTextInAnyFrame(textRe, { timeout = 15000 } = {}) {
  45  |         let found = null;
  46  |         await expect.poll(async () => {
  47  |             for (const frame of this.page.frames()) {
  48  |                 const loc = frame.getByText(textRe);
  49  |                 if (await loc.count().catch(() => 0) > 0) { found = loc.first(); return true; }
  50  |             }
  51  |             return false;
  52  |         }, { timeout, intervals: [500, 1000, 2000] }).toBe(true);
  53  |         return found;
  54  |     }
  55  | 
  56  |     // -------------------------------------------------------------------------
  57  | 
  58  |     /**
  59  |      * Assert the help desk widget launcher is available on the current page.
  60  |      */
  61  |     async verifyAvailable() {
  62  |         await test.step('Help desk widget — launcher is available', async () => {
  63  |             const launcher = await this.#findByRoleInAnyFrame(
  64  |                 'button',
  65  |                 /Open messaging window|Need any help/i,
  66  |             );
  67  |             await expect(launcher).toBeVisible();
  68  |         });
  69  |     }
  70  | 
  71  |     /**
  72  |      * Best-effort dismiss of the proactive "Hi. Need any help?" bubble and its
  73  |      * "Close message from company" (X) button. The bubble floats over the
  74  |      * bottom-right corner and can intercept pointer events on page controls
  75  |      * (e.g. "Get Started Now"), so the borrower flow closes it before
  76  |      * interacting with the page. Never throws — absence of the bubble is fine.
  77  |      */
  78  |     async dismissProactiveBubble() {
  79  |         await test.step('Help desk widget — dismiss proactive bubble', async () => {
  80  |             const proactiveClose = await this.#findByRoleInAnyFrame(
  81  |                 'button', /Close message from company/i, { timeout: 3000 },
  82  |             ).catch(() => null);
  83  |             if (proactiveClose) await proactiveClose.click().catch(() => { });
  84  |         });
  85  |     }
  86  | 
  87  |     /**
  88  |      * Open the messaging window via the launcher. Dismisses the proactive
  89  |      * "Hi. Need any help?" bubble first if it is overlaying the launcher.
  90  |      */
  91  |     async open() {
  92  |         await test.step('Help desk widget — open messaging window', async () => {
  93  |             // Best-effort: dismiss the proactive message bubble if present.
  94  |             await this.dismissProactiveBubble();
  95  | 
  96  |             const launcher = await this.#findByRoleInAnyFrame(
  97  |                 'button', /Open messaging window/i,
  98  |             );
  99  |             await launcher.click();
  100 | 
  101 |             // Give the messenger panel time to mount its iframe/content.
  102 |             // TODO: replace with an assertion on a confirmed messenger element
  103 |             // once the opened-panel DOM is verified against the live app.
  104 |             await this.page.waitForTimeout(2000);
  105 |         });
  106 |     }
  107 | 
  108 |     /**
  109 |      * Assert the opened messenger exposes an AI chat bot entry. Verified
  110 |      * present against the live widget via tolerant copy.
  111 |      *
  112 |      * Outside business hours some tenants (e.g. REMN) show a "currently
  113 |      * closed" fallback menu (Submit a Ticket / Continue Chatting w/Agent /
  114 |      * etc.) instead of the AI bot entry — that's expected tenant behavior,
  115 |      * not a bug, so it's accepted as an alternate pass condition rather than
  116 |      * failing the AI-bot assertion.
  117 |      * TODO: tighten to the exact AI-bot control/copy if the messenger UI is
  118 |      * locked down.
  119 |      */
  120 |     async verifyAiChatBotAvailable() {
  121 |         await test.step('Help desk widget — AI chat bot available', async () => {
  122 |             const bot = await this.#findTextInAnyFrame(
  123 |                 /Ask a question|Ask the bot|Fin|AI|instant answer|How can we help|Start a conversation|Chat with us/i,
  124 |                 { timeout: 5000 },
  125 |             ).catch(() => null);
  126 |             if (bot) {
> 127 |                 await expect(bot).toBeVisible();
      |                                   ^ Error: expect(locator).toBeVisible() failed
  128 |                 return;
  129 |             }
  130 | 
  131 |             const closedFallback = await this.#findTextInAnyFrame(
  132 |                 /currently closed|choose from the following|outside.*business hours/i,
  133 |                 { timeout: 5000 },
  134 |             ).catch(() => null);
  135 |             expect(
  136 |                 closedFallback,
  137 |                 'Neither an AI chat bot entry nor a "currently closed" fallback menu was found',
  138 |             ).not.toBeNull();
  139 |         });
  140 |     }
  141 | 
  142 |     /**
  143 |      * Assert the opened messenger lets the user submit a support ticket /
  144 |      * message. Verified present against the live widget via tolerant copy.
  145 |      * TODO: tighten to the exact submit-ticket control/copy if the messenger UI
  146 |      * is locked down.
  147 |      */
  148 |     async verifySubmitTicketAvailable() {
  149 |         await test.step('Help desk widget — submit support ticket available', async () => {
  150 |             const ticket = await this.#findTextInAnyFrame(
  151 |                 /Send us a message|Send a message|Submit a ticket|Get help|Email us|Leave a message|Message us/i,
  152 |             );
  153 |             await expect(ticket).toBeVisible();
  154 |         });
  155 |     }
  156 | }
  157 | 
  158 | export default HelpDeskWidget;
  159 | 
```