# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Borrower Flow/invitation-completion.spec.js >> LO Invitation — completion flows >> Scenario A: invited borrower opens the email and completes the application
- Location: tests/Borrower Flow/invitation-completion.spec.js:94:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Connect Checking Account|Bank Account Verification.*Plaid/i).first()
Expected: visible
Timeout: 90000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 90000ms
  - waiting for getByText(/Connect Checking Account|Bank Account Verification.*Plaid/i).first()

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - generic [ref=e15]: Homebridge Financial Services
      - generic [ref=e16]:
        - list [ref=e19]:
          - listitem [ref=e20]:
            - button "You're in Dev":
              - img
              - text: You're in Dev
        - list [ref=e23]:
          - listitem [ref=e24]:
            - button "My Loans Chevron down" [ref=e26] [cursor=pointer]:
              - img [ref=e27]
              - text: My Loans
              - img [ref=e30]
              - generic [ref=e32]: Chevron down
          - listitem [ref=e33]:
            - button "Quick Pricer" [ref=e35] [cursor=pointer]:
              - img [ref=e36]
              - text: Quick Pricer
          - listitem [ref=e38]:
            - button "Release Notes" [ref=e40] [cursor=pointer]:
              - img [ref=e41]
              - text: Release Notes
        - listitem [ref=e47]:
          - button "Show Old Design" [ref=e49] [cursor=pointer]:
            - img [ref=e50]
            - text: Show Old Design
      - list [ref=e53]:
        - listitem [ref=e54]:
          - button "AL Ace Loan Officer ace34@mailinator.com" [ref=e55] [cursor=pointer]:
            - generic [ref=e57]: AL
            - generic [ref=e58]:
              - paragraph [ref=e59]: Ace Loan Officer
              - paragraph [ref=e60]: ace34@mailinator.com
            - img [ref=e61]
    - main [ref=e65]:
      - generic [ref=e66]:
        - generic [ref=e67]:
          - heading "My Loans" [level=1] [ref=e68]
          - generic [ref=e69]:
            - button "Sharable App Link" [ref=e70] [cursor=pointer]:
              - img
              - text: Sharable App Link
            - button "Start App" [ref=e71] [cursor=pointer]:
              - img
              - text: Start App
        - generic [ref=e72]:
          - heading "Overview" [level=2] [ref=e74]
          - generic [ref=e75]:
            - generic [ref=e77]:
              - generic [ref=e79]: My Loans
              - generic [ref=e80]:
                - generic [ref=e81]: "520"
                - generic [ref=e82]: / $49,295,000
            - generic [ref=e84]:
              - generic [ref=e85]:
                - img [ref=e87]
                - generic [ref=e92]: Pre-Qual
              - generic [ref=e93]:
                - generic [ref=e94]: "429"
                - generic [ref=e95]: / $32,225,000
            - generic [ref=e97]:
              - generic [ref=e98]:
                - img [ref=e100]
                - generic [ref=e102]: In Process
              - generic [ref=e103]:
                - generic [ref=e104]: "91"
                - generic [ref=e105]: / $17,070,000
            - generic [ref=e107]:
              - generic [ref=e108]:
                - img [ref=e110]
                - generic [ref=e112]: Closing
              - generic [ref=e113]:
                - generic [ref=e114]: "0"
                - generic [ref=e115]: / $0
            - generic [ref=e117]:
              - generic [ref=e118]:
                - img [ref=e120]
                - generic [ref=e122]: Funded
              - generic [ref=e123]:
                - generic [ref=e124]: "0"
                - generic [ref=e125]: / $0
        - generic [ref=e126]:
          - generic [ref=e127]:
            - generic [ref=e128]:
              - generic [ref=e129]:
                - img [ref=e130]
                - textbox "Search by email, name, full address or loan number" [ref=e133]
              - button "Filter" [ref=e135] [cursor=pointer]:
                - img
                - text: Filter
            - tablist "View mode" [ref=e136]:
              - tab "List" [selected] [ref=e137] [cursor=pointer]:
                - img [ref=e139]
                - text: List
          - generic [ref=e140]:
            - generic [ref=e141]:
              - button "0 Pending MLO Certification 192 applications / $16,685,000" [ref=e142] [cursor=pointer]:
                - generic [ref=e143]:
                  - generic [ref=e144]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e145]
                  - generic [ref=e146]: 192 applications / $16,685,000
                - img [ref=e147]
              - generic [ref=e150]:
                - table [ref=e152]:
                  - rowgroup [ref=e153]:
                    - row "Applicant Property Address Loan Amount Status LO Assistant Time in Stage" [ref=e154]:
                      - columnheader "Applicant" [ref=e155]:
                        - generic [ref=e156]: Applicant
                      - columnheader "Property Address" [ref=e157]:
                        - generic [ref=e158]: Property Address
                      - columnheader "Loan Amount" [ref=e159]:
                        - generic [ref=e160]: Loan Amount
                      - columnheader "Status" [ref=e161]:
                        - generic [ref=e162]: Status
                      - columnheader "LO Assistant" [ref=e163]:
                        - generic [ref=e164]: LO Assistant
                      - columnheader "Time in Stage" [ref=e165]:
                        - generic [ref=e166]: Time in Stage
                      - columnheader [ref=e167]
                  - rowgroup [ref=e168]:
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 23h Time since application was created Certify" [ref=e169]:
                      - cell "Andy America 5121231113" [ref=e170]:
                        - generic [ref=e171]:
                          - link "Andy America" [ref=e172] [cursor=pointer]:
                            - /url: /portal/loan/6a4832eefdc2fddab513f22d/summary/overview
                          - generic [ref=e173]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e174]
                      - cell "$50,000" [ref=e175]
                      - cell "Pending MLO Certification" [ref=e176]:
                        - generic [ref=e177]: Pending MLO Certification
                      - cell "—" [ref=e178]
                      - cell "0d 23h Time since application was created" [ref=e179]:
                        - generic [ref=e180]:
                          - text: 0d 23h
                          - img "Time since application was created" [ref=e181]
                      - cell "Certify" [ref=e183]:
                        - generic [ref=e184]:
                          - button "More Actions" [ref=e185] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e186] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 1d 1h Time since application was created Certify" [ref=e187]:
                      - cell "Andy America 5121231113" [ref=e188]:
                        - generic [ref=e189]:
                          - link "Andy America" [ref=e190] [cursor=pointer]:
                            - /url: /portal/loan/6a481a568053f6810548b4d3/summary/overview
                          - generic [ref=e191]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e192]
                      - cell "$50,000" [ref=e193]
                      - cell "Pending MLO Certification" [ref=e194]:
                        - generic [ref=e195]: Pending MLO Certification
                      - cell "—" [ref=e196]
                      - cell "1d 1h Time since application was created" [ref=e197]:
                        - generic [ref=e198]:
                          - text: 1d 1h
                          - img "Time since application was created" [ref=e199]
                      - cell "Certify" [ref=e201]:
                        - generic [ref=e202]:
                          - button "More Actions" [ref=e203] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e204] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 1d 6h Time since application was created Certify" [ref=e205]:
                      - cell "Andy America 5121231113" [ref=e206]:
                        - generic [ref=e207]:
                          - link "Andy America" [ref=e208] [cursor=pointer]:
                            - /url: /portal/loan/6a47d9e85e5e67a83d9393cd/summary/overview
                          - generic [ref=e209]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e210]
                      - cell "$50,000" [ref=e211]
                      - cell "Pending MLO Certification" [ref=e212]:
                        - generic [ref=e213]: Pending MLO Certification
                      - cell "—" [ref=e214]
                      - cell "1d 6h Time since application was created" [ref=e215]:
                        - generic [ref=e216]:
                          - text: 1d 6h
                          - img "Time since application was created" [ref=e217]
                      - cell "Certify" [ref=e219]:
                        - generic [ref=e220]:
                          - button "More Actions" [ref=e221] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e222] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $180,000 Pending MLO Certification — 1d 9h Time since application was created Certify" [ref=e223]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e224]:
                        - generic [ref=e225]:
                          - link "Andy America, Amy America" [ref=e226] [cursor=pointer]:
                            - /url: /portal/loan/6a47a9b49bd7219645e9f336/summary/overview
                          - generic [ref=e227]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e228]
                      - cell "$180,000" [ref=e229]
                      - cell "Pending MLO Certification" [ref=e230]:
                        - generic [ref=e231]: Pending MLO Certification
                      - cell "—" [ref=e232]
                      - cell "1d 9h Time since application was created" [ref=e233]:
                        - generic [ref=e234]:
                          - text: 1d 9h
                          - img "Time since application was created" [ref=e235]
                      - cell "Certify" [ref=e237]:
                        - generic [ref=e238]:
                          - button "More Actions" [ref=e239] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e240] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 1d 10h Time since application was created Certify" [ref=e241]:
                      - cell "Andy America 5121231113" [ref=e242]:
                        - generic [ref=e243]:
                          - link "Andy America" [ref=e244] [cursor=pointer]:
                            - /url: /portal/loan/6a4799234b56f1840e70b5a3/summary/overview
                          - generic [ref=e245]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e246]
                      - cell "$50,000" [ref=e247]
                      - cell "Pending MLO Certification" [ref=e248]:
                        - generic [ref=e249]: Pending MLO Certification
                      - cell "—" [ref=e250]
                      - cell "1d 10h Time since application was created" [ref=e251]:
                        - generic [ref=e252]:
                          - text: 1d 10h
                          - img "Time since application was created" [ref=e253]
                      - cell "Certify" [ref=e255]:
                        - generic [ref=e256]:
                          - button "More Actions" [ref=e257] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e258] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 2d 0h Time since application was created Certify" [ref=e259]:
                      - cell "Andy America 5121231113" [ref=e260]:
                        - generic [ref=e261]:
                          - link "Andy America" [ref=e262] [cursor=pointer]:
                            - /url: /portal/loan/6a46d40f3318a485b2dd3708/summary/overview
                          - generic [ref=e263]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e264]
                      - cell "$50,000" [ref=e265]
                      - cell "Pending MLO Certification" [ref=e266]:
                        - generic [ref=e267]: Pending MLO Certification
                      - cell "—" [ref=e268]
                      - cell "2d 0h Time since application was created" [ref=e269]:
                        - generic [ref=e270]:
                          - text: 2d 0h
                          - img "Time since application was created" [ref=e271]
                      - cell "Certify" [ref=e273]:
                        - generic [ref=e274]:
                          - button "More Actions" [ref=e275] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e276] [cursor=pointer]
                - generic [ref=e277]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e278] [cursor=pointer]
                  - button "2" [ref=e279] [cursor=pointer]
                  - generic [ref=e280]: ...
                  - button "32" [ref=e281] [cursor=pointer]
                  - button "Next" [ref=e282] [cursor=pointer]:
                    - text: Next
                    - img
            - generic [ref=e283]:
              - button "1 Pre-Qual 429 applications / $32,225,000" [ref=e284] [cursor=pointer]:
                - generic [ref=e285]:
                  - generic [ref=e286]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e287]
                  - generic [ref=e288]: 429 applications / $32,225,000
                - img [ref=e289]
              - generic [ref=e292]:
                - table [ref=e294]:
                  - rowgroup [ref=e295]:
                    - row "Applicant Property Address Loan Amount Processor / LOA Time in Stage" [ref=e296]:
                      - columnheader "Applicant" [ref=e297]:
                        - generic [ref=e298]: Applicant
                      - columnheader "Property Address" [ref=e299]:
                        - generic [ref=e300]: Property Address
                      - columnheader "Loan Amount" [ref=e301]:
                        - generic [ref=e302]: Loan Amount
                      - columnheader "Processor / LOA" [ref=e303]:
                        - generic [ref=e304]: Processor / LOA
                      - columnheader "Time in Stage" [ref=e305]:
                        - generic [ref=e306]: Time in Stage
                      - columnheader [ref=e307]
                  - rowgroup [ref=e308]:
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h" [ref=e309]:
                      - cell "Andy America 5121231113" [ref=e310]:
                        - generic [ref=e311]:
                          - link "Andy America" [ref=e312] [cursor=pointer]:
                            - /url: /portal/loan/6a498180fdc2fddab513f885/summary/overview
                          - generic [ref=e313]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e314]:
                        - generic [ref=e315]:
                          - generic [ref=e316]: 4556 Eliot St
                          - generic [ref=e317]: Denver, CO 80211
                      - cell "$100,000" [ref=e318]
                      - cell "Ace Loan Officer" [ref=e319]
                      - cell "0 d 0 h" [ref=e320]:
                        - generic [ref=e321]:
                          - generic [ref=e322]: 0 d 0 h
                          - img [ref=e323]
                      - cell [ref=e325]:
                        - button "More Actions" [ref=e326] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 23 h" [ref=e327]:
                      - cell "Andy America 5121231113" [ref=e328]:
                        - generic [ref=e329]:
                          - link "Andy America" [ref=e330] [cursor=pointer]:
                            - /url: /portal/loan/6a483372fdc2fddab513f2cc/summary/overview
                          - generic [ref=e331]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e332]:
                        - generic [ref=e333]:
                          - generic [ref=e334]: 4556 Eliot St
                          - generic [ref=e335]: Denver, CO 80211
                      - cell "$100,000" [ref=e336]
                      - cell "Ace Loan Officer" [ref=e337]
                      - cell "0 d 23 h" [ref=e338]:
                        - generic [ref=e339]:
                          - generic [ref=e340]: 0 d 23 h
                          - img [ref=e341]
                      - cell [ref=e343]:
                        - button "More Actions" [ref=e344] [cursor=pointer]:
                          - img
                    - row "Andy America, Amy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 23 h" [ref=e345]:
                      - cell "Andy America, Amy America 5121231113" [ref=e346]:
                        - generic [ref=e347]:
                          - link "Andy America, Amy America" [ref=e348] [cursor=pointer]:
                            - /url: /portal/loan/6a4832f3fdc2fddab513f236/summary/overview
                          - generic [ref=e349]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e350]:
                        - generic [ref=e351]:
                          - generic [ref=e352]: 4556 Eliot St
                          - generic [ref=e353]: Denver, CO 80211
                      - cell "$100,000" [ref=e354]
                      - cell "Ace Loan Officer" [ref=e355]
                      - cell "0 d 23 h" [ref=e356]:
                        - generic [ref=e357]:
                          - generic [ref=e358]: 0 d 23 h
                          - img [ref=e359]
                      - cell [ref=e361]:
                        - button "More Actions" [ref=e362] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $50,000 Ace Loan Officer 0 d 23 h" [ref=e363]:
                      - cell "Andy America 5121231113" [ref=e364]:
                        - generic [ref=e365]:
                          - link "Andy America" [ref=e366] [cursor=pointer]:
                            - /url: /portal/loan/6a4832eefdc2fddab513f22d/summary/overview
                          - generic [ref=e367]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e368]:
                        - generic [ref=e369]:
                          - generic [ref=e370]: 4556 Eliot St
                          - generic [ref=e371]: Denver, CO 80211
                      - cell "$50,000" [ref=e372]
                      - cell "Ace Loan Officer" [ref=e373]
                      - cell "0 d 23 h" [ref=e374]:
                        - generic [ref=e375]:
                          - generic [ref=e376]: 0 d 23 h
                          - img [ref=e377]
                      - cell [ref=e379]:
                        - button "More Actions" [ref=e380] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 23 h" [ref=e381]:
                      - cell "Andy America 5121231113" [ref=e382]:
                        - generic [ref=e383]:
                          - link "Andy America" [ref=e384] [cursor=pointer]:
                            - /url: /portal/loan/6a48319efdc2fddab513f191/summary/overview
                          - generic [ref=e385]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e386]:
                        - generic [ref=e387]:
                          - generic [ref=e388]: 4556 Eliot St
                          - generic [ref=e389]: Denver, CO 80211
                      - cell "$100,000" [ref=e390]
                      - cell "Ace Loan Officer" [ref=e391]
                      - cell "0 d 23 h" [ref=e392]:
                        - generic [ref=e393]:
                          - generic [ref=e394]: 0 d 23 h
                          - img [ref=e395]
                      - cell [ref=e397]:
                        - button "More Actions" [ref=e398] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 23 h" [ref=e399]:
                      - cell "Andy America 5121231113" [ref=e400]:
                        - generic [ref=e401]:
                          - link "Andy America" [ref=e402] [cursor=pointer]:
                            - /url: /portal/loan/6a48310bfdc2fddab513f140/summary/overview
                          - generic [ref=e403]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e404]:
                        - generic [ref=e405]:
                          - generic [ref=e406]: 4556 Eliot St
                          - generic [ref=e407]: Denver, CO 80211
                      - cell "$100,000" [ref=e408]
                      - cell "Ace Loan Officer" [ref=e409]
                      - cell "0 d 23 h" [ref=e410]:
                        - generic [ref=e411]:
                          - generic [ref=e412]: 0 d 23 h
                          - img [ref=e413]
                      - cell [ref=e415]:
                        - button "More Actions" [ref=e416] [cursor=pointer]:
                          - img
                - generic [ref=e417]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e418] [cursor=pointer]
                  - button "2" [ref=e419] [cursor=pointer]
                  - generic [ref=e420]: ...
                  - button "72" [ref=e421] [cursor=pointer]
                  - button "Next" [ref=e422] [cursor=pointer]:
                    - text: Next
                    - img
            - button "2 In Process 91 applications / $17,070,000" [ref=e424] [cursor=pointer]:
              - generic [ref=e425]:
                - generic [ref=e426]: "2"
                - heading "In Process" [level=3] [ref=e427]
                - generic [ref=e428]: 91 applications / $17,070,000
              - img [ref=e429]
            - button "3 Closing 0 applications / $0" [ref=e432] [cursor=pointer]:
              - generic [ref=e433]:
                - generic [ref=e434]: "3"
                - heading "Closing" [level=3] [ref=e435]
                - generic [ref=e436]: 0 applications / $0
              - img [ref=e437]
            - button "4 Funded 0 applications / $0" [ref=e440] [cursor=pointer]:
              - generic [ref=e441]:
                - generic [ref=e442]: "4"
                - heading "Funded" [level=3] [ref=e443]
                - generic [ref=e444]: 0 applications / $0
              - img [ref=e445]
  - alert [ref=e447]: /portal
  - generic:
    - generic:
      - generic [ref=e449]:
        - iframe [ref=e450]:
          - button "Close message from company" [ref=f8e4] [cursor=pointer]:
            - img [ref=f8e5]
        - iframe [ref=e451]:
          - button "Hi. Need any help?" [ref=f9e5] [cursor=pointer]
      - iframe [ref=e452]:
        - button "Open messaging window" [ref=f10e5] [cursor=pointer]:
          - img [ref=f10e7]
          - img [ref=f10e10]
```

# Test source

```ts
  1154 |                         'payroll income-verification step.'
  1155 |                     );
  1156 |                 }
  1157 |             }
  1158 | 
  1159 |             // Employment Authorization modal — scroll the certification to 100% so
  1160 |             // the disabled "PLEASE READ DOCUMENT ABOVE" button becomes "I Agree".
  1161 |             // Skipped on restarts where Truework already holds the signed consent.
  1162 |             // Use .MuiDialog-paper to avoid the hidden canopy__modal__container,
  1163 |             // which also carries role="dialog" and is resolved first by Playwright.
  1164 |             if (stage === 'modal') {
  1165 |                 await modal.waitFor({ state: 'visible', timeout: 120000 });
  1166 |                 await this.page.getByText(/Certification/i).first()
  1167 |                     .waitFor({ state: 'visible', timeout: 10000 });
  1168 | 
  1169 |                 // Scroll the tallest inner scrollable to the bottom — this advances
  1170 |                 // the "0% ↓" counter to 100% and swaps the button for "I Agree".
  1171 |                 await modal.evaluate(el => {
  1172 |                     const scrollables = Array.from(el.querySelectorAll('div')).filter(d => {
  1173 |                         const s = window.getComputedStyle(d);
  1174 |                         return (s.overflowY === 'auto' || s.overflowY === 'scroll')
  1175 |                             && d.scrollHeight > d.clientHeight + 10;
  1176 |                     });
  1177 |                     scrollables.sort((a, b) => b.scrollHeight - a.scrollHeight);
  1178 |                     if (scrollables.length > 0) scrollables[0].scrollTop = scrollables[0].scrollHeight;
  1179 |                 });
  1180 | 
  1181 |                 const iAgreeBtn = this.page.getByRole('button', { name: /I Agree/i }).first();
  1182 |                 await iAgreeBtn.waitFor({ state: 'visible', timeout: 20000 });
  1183 |                 await expect(iAgreeBtn).toBeEnabled({ timeout: 20000 });
  1184 |                 await iAgreeBtn.click({ force: true });
  1185 | 
  1186 |                 // Wait for consent success toast.
  1187 |                 await this.page.getByText(/Employment verification consent signed successfully/i).first()
  1188 |                     .waitFor({ state: 'visible', timeout: 30000 });
  1189 |             }
  1190 | 
  1191 |             // --- Truework widget flow ---
  1192 |             // Each screen is gated through appears() so a restart that resumes
  1193 |             // mid-flow (some screens remembered) skips what's already done.
  1194 | 
  1195 |             // Screen 1: "… uses Truework for verifications" consent.
  1196 |             if (await appears(twConsentBtn, 120000)) await twConsentBtn.click();
  1197 | 
  1198 |             // Screen 2: "Complete your tasks" — the "Connect payroll" row.
  1199 |             const connectPayrollRow = twFrame.getByText(/Connect payroll/i).first();
  1200 |             if (await appears(connectPayrollRow, 15000)) await connectPayrollRow.click();
  1201 | 
  1202 |             // Screen 2b: "Find your employer" — clicking the task row opens a search;
  1203 |             // click the first result row.
  1204 |             const searchLink = twFrame.locator('[data-cy="unified_search_link"]').first();
  1205 |             if (await appears(searchLink, 15000)) await searchLink.click();
  1206 | 
  1207 |             // Screen 3: "Log in to Hitch" — sandbox credentials shown in the modal.
  1208 |             const usernameField = twFrame.getByLabel(/Username/i).first();
  1209 |             if (await appears(usernameField, 15000)) {
  1210 |                 await usernameField.fill('user_good');
  1211 |                 await twFrame.getByLabel(/Password/i).first().fill('pass_good');
  1212 |                 await twFrame.getByRole('button', { name: /^Connect$/i }).click();
  1213 |             }
  1214 | 
  1215 |             // Wait for "Awaiting Response..." to resolve and payroll to connect.
  1216 |             // Status text (not a button) — best-effort even on the first run, since
  1217 |             // a fast connect can replace it before we look.
  1218 |             await twFrame.getByText(/Successfully connected payroll/i).first()
  1219 |                 .waitFor({ state: 'visible', timeout: tolerant ? 30000 : 60000 })
  1220 |                 .catch(() => { });
  1221 | 
  1222 |             // Click "I'm done, submit" to close the Truework widget.
  1223 |             const doneBtn = twFrame.getByRole('button', { name: /I'm done, submit/i });
  1224 |             if (await appears(doneBtn, 60000)) await doneBtn.click();
  1225 |         });
  1226 |     }
  1227 | 
  1228 |     // -------------------------------------------------------------------------
  1229 | 
  1230 |     /**
  1231 |      * Income Verification & Documentation — assert the page offers all three
  1232 |      * ways a borrower can satisfy income verification:
  1233 |      *   1. Connect Checking Account         (link banking via Plaid)
  1234 |      *   2. Login to Company Payroll Account  (link payroll via The Work Number / TrueWork)
  1235 |      *   3. Upload Income Documents Manually  (manual documentation)
  1236 |      *
  1237 |      * Validates the feature contract — "borrowers can link banking and payroll
  1238 |      * securely, OR upload documents manually" — regardless of which method is
  1239 |      * ultimately completed.
  1240 |      *
  1241 |      * Only the banking/Plaid option label is confirmed against the live app
  1242 |      * (it drives the implemented fillIncomeVerification path). The payroll and
  1243 |      * manual labels are best-effort regexes derived from the option copy noted
  1244 |      * in fillIncomeVerification — TODO: confirm exact text against the live UI.
  1245 |      */
  1246 |     async verifyIncomeVerificationOptions() {
  1247 |         await test.step('Verify income verification & documentation options', async () => {
  1248 |             await this.page.waitForURL(/income-verification/i, { timeout: 60000 }).catch(() => { });
  1249 | 
  1250 |             // Banking (Plaid) — known-good copy from the implemented Plaid path.
  1251 |             const bankingOption = this.page
  1252 |                 .getByText(/Connect Checking Account|Bank Account Verification.*Plaid/i)
  1253 |                 .first();
> 1254 |             await expect(bankingOption).toBeVisible({ timeout: 90000 });
       |                                         ^ Error: expect(locator).toBeVisible() failed
  1255 | 
  1256 |             // Payroll (The Work Number / TrueWork). TODO: confirm exact copy.
  1257 |             const payrollOption = this.page
  1258 |                 .getByText(/Company Payroll Account|Login to.*Payroll|The Work Number|Payroll Account/i)
  1259 |                 .first();
  1260 |             await expect(payrollOption).toBeVisible({ timeout: 15000 });
  1261 | 
  1262 |             // Manual document upload. TODO: confirm exact copy.
  1263 |             const manualOption = this.page
  1264 |                 .getByText(/Upload Income Documents Manually|Upload.*Documents?.*Manually|Upload Manually/i)
  1265 |                 .first();
  1266 |             await expect(manualOption).toBeVisible({ timeout: 15000 });
  1267 |         });
  1268 |     }
  1269 | 
  1270 |     /**
  1271 |      * Selects one of the three income-verification methods on the Income
  1272 |      * Verification page.
  1273 |      *
  1274 |      * @param {'plaid'|'payroll'|'manual'} method
  1275 |      *
  1276 |      * Only the 'plaid' selection is confirmed against the live app today.
  1277 |      * 'payroll' and 'manual' use best-effort locators derived from the option
  1278 |      * label text — TODO: confirm against the live DOM before relying on them.
  1279 |      */
  1280 |     async selectIncomeVerificationMethod(method) {
  1281 |         await test.step(`Select income verification method: ${method}`, async () => {
  1282 |             const labels = {
  1283 |                 plaid:   /Connect Checking Account/i,
  1284 |                 payroll: /Login to.*Payroll|Company Payroll Account|The Work Number/i, // TODO: verify
  1285 |                 manual:  /Upload Income Documents Manually/i,                          // TODO: verify
  1286 |             };
  1287 |             const label = labels[method];
  1288 |             if (!label) throw new Error(`Unknown income verification method: ${method}`);
  1289 | 
  1290 |             const card = this.page.getByText(label).first();
  1291 |             await card.waitFor({ state: 'visible', timeout: 30000 });
  1292 |             await card.click({ force: true });
  1293 |         });
  1294 |     }
  1295 | 
  1296 |     /**
  1297 |      * Manual documentation path — selects "Upload Income Documents Manually"
  1298 |      * and uploads one or more files via the page's file input.
  1299 |      *
  1300 |      * BEST-EFFORT / TODO: not yet exercised against the live app. The
  1301 |      * file-input selector and the success signal below are derived from common
  1302 |      * patterns and MUST be verified once the manual-upload UI is available.
  1303 |      * setInputFiles works on a hidden <input type="file"> without it being
  1304 |      * visible, so we only wait for it to be attached.
  1305 |      *
  1306 |      * @param {string|string[]} filePaths  absolute path(s) to the document(s)
  1307 |      */
  1308 |     async uploadIncomeDocumentsManually(filePaths) {
  1309 |         await test.step('Upload income documents manually', async () => {
  1310 |             await this.selectIncomeVerificationMethod('manual');
  1311 | 
  1312 |             // TODO: verify the file-input selector against the live app.
  1313 |             const fileInput = this.page.locator('input[type="file"]').first();
  1314 |             await fileInput.waitFor({ state: 'attached', timeout: 15000 });
  1315 |             await fileInput.setInputFiles(filePaths);
  1316 | 
  1317 |             // TODO: verify the upload success signal (filename chip / "Uploaded"
  1318 |             // badge / Continue enabling) against the live app.
  1319 |             const continueBtn = this.page.getByRole('button', { name: /^Continue$/i }).first();
  1320 |             await continueBtn.waitFor({ state: 'visible', timeout: 30000 });
  1321 |             await expect(continueBtn).toBeEnabled({ timeout: 30000 });
  1322 |             await continueBtn.click({ force: true });
  1323 |         });
  1324 |     }
  1325 | 
  1326 |     /**
  1327 |      * Payroll documentation path — "Login to Your Company Payroll Account"
  1328 |      * (The Work Number / TrueWork).
  1329 |      *
  1330 |      * BEST-EFFORT STUB / TODO: not yet exercised against the live app. The
  1331 |      * payroll login renders in a third-party (TWN/TrueWork) iframe whose DOM is
  1332 |      * unknown here. Throws if invoked so it is never silently skipped — wire up
  1333 |      * the provider-select → credentials → consent steps and the verified-income
  1334 |      * success assertion once that iframe is available.
  1335 |      */
  1336 |     async completePayrollVerification(_data) {
  1337 |         await test.step('Verify income via company payroll (The Work Number)', async () => {
  1338 |             await this.selectIncomeVerificationMethod('payroll');
  1339 |             throw new Error(
  1340 |                 'completePayrollVerification is a best-effort stub — confirm the ' +
  1341 |                 'TWN/TrueWork payroll iframe DOM against the live app before enabling.'
  1342 |             );
  1343 |         });
  1344 |     }
  1345 | 
  1346 |     // -------------------------------------------------------------------------
  1347 | 
  1348 |     /**
  1349 |      * Step 17 — Funding Account page.
  1350 |      *
  1351 |      * Runs the Plaid sandbox flow to connect a bank account:
  1352 |      *   1. Click "CONNECT BANK ACCOUNT"
  1353 |      *   2. Enter sandbox phone (415-555-0011) → Continue
  1354 |      *   3. Type OTP 123456 (auto-submits after 6th digit)
```