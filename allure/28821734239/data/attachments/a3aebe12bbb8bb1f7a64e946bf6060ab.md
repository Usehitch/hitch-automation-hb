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
                - generic [ref=e81]: "590"
                - generic [ref=e82]: / $54,595,000
            - generic [ref=e84]:
              - generic [ref=e85]:
                - img [ref=e87]
                - generic [ref=e92]: Pre-Qual
              - generic [ref=e93]:
                - generic [ref=e94]: "495"
                - generic [ref=e95]: / $37,125,000
            - generic [ref=e97]:
              - generic [ref=e98]:
                - img [ref=e100]
                - generic [ref=e102]: In Process
              - generic [ref=e103]:
                - generic [ref=e104]: "95"
                - generic [ref=e105]: / $17,470,000
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
              - button "0 Pending MLO Certification 206 applications / $16,935,000" [ref=e142] [cursor=pointer]:
                - generic [ref=e143]:
                  - generic [ref=e144]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e145]
                  - generic [ref=e146]: 206 applications / $16,935,000
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
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 0h Time since application was created Certify" [ref=e169]:
                      - cell "Andy America 5121231113" [ref=e170]:
                        - generic [ref=e171]:
                          - link "Andy America" [ref=e172] [cursor=pointer]:
                            - /url: /portal/loan/6a4c2854f16bc6c5477870c5/summary/overview
                          - generic [ref=e173]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e174]
                      - cell "$0" [ref=e175]
                      - cell "Pending MLO Certification" [ref=e176]:
                        - generic [ref=e177]: Pending MLO Certification
                      - cell "—" [ref=e178]
                      - cell "0d 0h Time since application was created" [ref=e179]:
                        - generic [ref=e180]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e181]
                      - cell "Certify" [ref=e183]:
                        - generic [ref=e184]:
                          - button "More Actions" [ref=e185] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e186] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 0h Time since application was created Certify" [ref=e187]:
                      - cell "Andy America 5121231113" [ref=e188]:
                        - generic [ref=e189]:
                          - link "Andy America" [ref=e190] [cursor=pointer]:
                            - /url: /portal/loan/6a4c1ce2f16bc6c547786c4f/summary/overview
                          - generic [ref=e191]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e192]
                      - cell "$50,000" [ref=e193]
                      - cell "Pending MLO Certification" [ref=e194]:
                        - generic [ref=e195]: Pending MLO Certification
                      - cell "—" [ref=e196]
                      - cell "0d 0h Time since application was created" [ref=e197]:
                        - generic [ref=e198]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e199]
                      - cell "Certify" [ref=e201]:
                        - generic [ref=e202]:
                          - button "More Actions" [ref=e203] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e204] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 5h Time since application was created Certify" [ref=e205]:
                      - cell "Andy America 5121231113" [ref=e206]:
                        - generic [ref=e207]:
                          - link "Andy America" [ref=e208] [cursor=pointer]:
                            - /url: /portal/loan/6a4bdc73ae177df105f06e1e/summary/overview
                          - generic [ref=e209]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e210]
                      - cell "$50,000" [ref=e211]
                      - cell "Pending MLO Certification" [ref=e212]:
                        - generic [ref=e213]: Pending MLO Certification
                      - cell "—" [ref=e214]
                      - cell "0d 5h Time since application was created" [ref=e215]:
                        - generic [ref=e216]:
                          - text: 0d 5h
                          - img "Time since application was created" [ref=e217]
                      - cell "Certify" [ref=e219]:
                        - generic [ref=e220]:
                          - button "More Actions" [ref=e221] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e222] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 6h Time since application was created Certify" [ref=e223]:
                      - cell "Andy America 5121231113" [ref=e224]:
                        - generic [ref=e225]:
                          - link "Andy America" [ref=e226] [cursor=pointer]:
                            - /url: /portal/loan/6a4bc6adcf6fe330c52bf911/summary/overview
                          - generic [ref=e227]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e228]
                      - cell "$50,000" [ref=e229]
                      - cell "Pending MLO Certification" [ref=e230]:
                        - generic [ref=e231]: Pending MLO Certification
                      - cell "—" [ref=e232]
                      - cell "0d 6h Time since application was created" [ref=e233]:
                        - generic [ref=e234]:
                          - text: 0d 6h
                          - img "Time since application was created" [ref=e235]
                      - cell "Certify" [ref=e237]:
                        - generic [ref=e238]:
                          - button "More Actions" [ref=e239] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e240] [cursor=pointer]
                    - row "Andy America, Amy America 5121231113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 7h Time since application was created Certify" [ref=e241]:
                      - cell "Andy America, Amy America 5121231113" [ref=e242]:
                        - generic [ref=e243]:
                          - link "Andy America, Amy America" [ref=e244] [cursor=pointer]:
                            - /url: /portal/loan/6a4bc5d1cf6fe330c52bf7cb/summary/overview
                          - generic [ref=e245]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e246]
                      - cell "$0" [ref=e247]
                      - cell "Pending MLO Certification" [ref=e248]:
                        - generic [ref=e249]: Pending MLO Certification
                      - cell "—" [ref=e250]
                      - cell "0d 7h Time since application was created" [ref=e251]:
                        - generic [ref=e252]:
                          - text: 0d 7h
                          - img "Time since application was created" [ref=e253]
                      - cell "Certify" [ref=e255]:
                        - generic [ref=e256]:
                          - button "More Actions" [ref=e257] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e258] [cursor=pointer]
                    - row "Andy America 5121231113 4556 ELIOT ST, DENVER, CO 80211 $0 Pending MLO Certification — 0d 10h Time since application was created Certify" [ref=e259]:
                      - cell "Andy America 5121231113" [ref=e260]:
                        - generic [ref=e261]:
                          - link "Andy America" [ref=e262] [cursor=pointer]:
                            - /url: /portal/loan/6a4b9a66fdc2fddab51406b1/summary/overview
                          - generic [ref=e263]: "5121231113"
                      - cell "4556 ELIOT ST, DENVER, CO 80211" [ref=e264]
                      - cell "$0" [ref=e265]
                      - cell "Pending MLO Certification" [ref=e266]:
                        - generic [ref=e267]: Pending MLO Certification
                      - cell "—" [ref=e268]
                      - cell "0d 10h Time since application was created" [ref=e269]:
                        - generic [ref=e270]:
                          - text: 0d 10h
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
                  - button "35" [ref=e281] [cursor=pointer]
                  - button "Next" [ref=e282] [cursor=pointer]:
                    - text: Next
                    - img
            - generic [ref=e283]:
              - button "1 Pre-Qual 495 applications / $37,125,000" [ref=e284] [cursor=pointer]:
                - generic [ref=e285]:
                  - generic [ref=e286]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e287]
                  - generic [ref=e288]: 495 applications / $37,125,000
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
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $0 Ace Loan Officer 0 d 0 h" [ref=e309]:
                      - cell "Andy America 5121231113" [ref=e310]:
                        - generic [ref=e311]:
                          - link "Andy America" [ref=e312] [cursor=pointer]:
                            - /url: /portal/loan/6a4c2854f16bc6c5477870c5/summary/overview
                          - generic [ref=e313]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e314]:
                        - generic [ref=e315]:
                          - generic [ref=e316]: 4556 Eliot St
                          - generic [ref=e317]: Denver, CO 80211
                      - cell "$0" [ref=e318]
                      - cell "Ace Loan Officer" [ref=e319]
                      - cell "0 d 0 h" [ref=e320]:
                        - generic [ref=e321]:
                          - generic [ref=e322]: 0 d 0 h
                          - img [ref=e323]
                      - cell [ref=e325]:
                        - button "More Actions" [ref=e326] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h" [ref=e327]:
                      - cell "Andy America 5121231113" [ref=e328]:
                        - generic [ref=e329]:
                          - link "Andy America" [ref=e330] [cursor=pointer]:
                            - /url: /portal/loan/6a4c282df16bc6c5477870b4/summary/overview
                          - generic [ref=e331]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e332]:
                        - generic [ref=e333]:
                          - generic [ref=e334]: 4556 Eliot St
                          - generic [ref=e335]: Denver, CO 80211
                      - cell "$100,000" [ref=e336]
                      - cell "Ace Loan Officer" [ref=e337]
                      - cell "0 d 0 h" [ref=e338]:
                        - generic [ref=e339]:
                          - generic [ref=e340]: 0 d 0 h
                          - img [ref=e341]
                      - cell [ref=e343]:
                        - button "More Actions" [ref=e344] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h" [ref=e345]:
                      - cell "Andy America 5121231113" [ref=e346]:
                        - generic [ref=e347]:
                          - link "Andy America" [ref=e348] [cursor=pointer]:
                            - /url: /portal/loan/6a4c27aff16bc6c547787068/summary/overview
                          - generic [ref=e349]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e350]:
                        - generic [ref=e351]:
                          - generic [ref=e352]: 4556 Eliot St
                          - generic [ref=e353]: Denver, CO 80211
                      - cell "$100,000" [ref=e354]
                      - cell "Ace Loan Officer" [ref=e355]
                      - cell "0 d 0 h" [ref=e356]:
                        - generic [ref=e357]:
                          - generic [ref=e358]: 0 d 0 h
                          - img [ref=e359]
                      - cell [ref=e361]:
                        - button "More Actions" [ref=e362] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h" [ref=e363]:
                      - cell "Andy America 5121231113" [ref=e364]:
                        - generic [ref=e365]:
                          - link "Andy America" [ref=e366] [cursor=pointer]:
                            - /url: /portal/loan/6a4c2728f16bc6c547786fe3/summary/overview
                          - generic [ref=e367]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e368]:
                        - generic [ref=e369]:
                          - generic [ref=e370]: 4556 Eliot St
                          - generic [ref=e371]: Denver, CO 80211
                      - cell "$100,000" [ref=e372]
                      - cell "Ace Loan Officer" [ref=e373]
                      - cell "0 d 0 h" [ref=e374]:
                        - generic [ref=e375]:
                          - generic [ref=e376]: 0 d 0 h
                          - img [ref=e377]
                      - cell [ref=e379]:
                        - button "More Actions" [ref=e380] [cursor=pointer]:
                          - img
                    - row "Andy America, Amy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h" [ref=e381]:
                      - cell "Andy America, Amy America 5121231113" [ref=e382]:
                        - generic [ref=e383]:
                          - link "Andy America, Amy America" [ref=e384] [cursor=pointer]:
                            - /url: /portal/loan/6a4c269ff16bc6c547786f78/summary/overview
                          - generic [ref=e385]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e386]:
                        - generic [ref=e387]:
                          - generic [ref=e388]: 4556 Eliot St
                          - generic [ref=e389]: Denver, CO 80211
                      - cell "$100,000" [ref=e390]
                      - cell "Ace Loan Officer" [ref=e391]
                      - cell "0 d 0 h" [ref=e392]:
                        - generic [ref=e393]:
                          - generic [ref=e394]: 0 d 0 h
                          - img [ref=e395]
                      - cell [ref=e397]:
                        - button "More Actions" [ref=e398] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h" [ref=e399]:
                      - cell "Andy America 5121231113" [ref=e400]:
                        - generic [ref=e401]:
                          - link "Andy America" [ref=e402] [cursor=pointer]:
                            - /url: /portal/loan/6a4c2618f16bc6c547786ef2/summary/overview
                          - generic [ref=e403]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e404]:
                        - generic [ref=e405]:
                          - generic [ref=e406]: 4556 Eliot St
                          - generic [ref=e407]: Denver, CO 80211
                      - cell "$100,000" [ref=e408]
                      - cell "Ace Loan Officer" [ref=e409]
                      - cell "0 d 0 h" [ref=e410]:
                        - generic [ref=e411]:
                          - generic [ref=e412]: 0 d 0 h
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
                  - button "83" [ref=e421] [cursor=pointer]
                  - button "Next" [ref=e422] [cursor=pointer]:
                    - text: Next
                    - img
            - button "2 In Process 95 applications / $17,470,000" [ref=e424] [cursor=pointer]:
              - generic [ref=e425]:
                - generic [ref=e426]: "2"
                - heading "In Process" [level=3] [ref=e427]
                - generic [ref=e428]: 95 applications / $17,470,000
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
          - button "Close message from company" [ref=f9e4] [cursor=pointer]:
            - img [ref=f9e5]
        - iframe [ref=e451]:
          - button "Hi. Need any help?" [ref=f10e5] [cursor=pointer]
      - iframe [ref=e452]:
        - button "Open messaging window" [ref=f11e5] [cursor=pointer]:
          - img [ref=f11e7]
          - img [ref=f11e10]
```

# Test source

```ts
  1277 |                         'payroll income-verification step.'
  1278 |                     );
  1279 |                 }
  1280 |             }
  1281 | 
  1282 |             // Employment Authorization modal — scroll the certification to 100% so
  1283 |             // the disabled "PLEASE READ DOCUMENT ABOVE" button becomes "I Agree".
  1284 |             // Skipped on restarts where Truework already holds the signed consent.
  1285 |             // Use .MuiDialog-paper to avoid the hidden canopy__modal__container,
  1286 |             // which also carries role="dialog" and is resolved first by Playwright.
  1287 |             if (stage === 'modal') {
  1288 |                 await modal.waitFor({ state: 'visible', timeout: 120000 });
  1289 |                 await this.page.getByText(/Certification/i).first()
  1290 |                     .waitFor({ state: 'visible', timeout: 10000 });
  1291 | 
  1292 |                 // Scroll the tallest inner scrollable to the bottom — this advances
  1293 |                 // the "0% ↓" counter to 100% and swaps the button for "I Agree".
  1294 |                 await modal.evaluate(el => {
  1295 |                     const scrollables = Array.from(el.querySelectorAll('div')).filter(d => {
  1296 |                         const s = window.getComputedStyle(d);
  1297 |                         return (s.overflowY === 'auto' || s.overflowY === 'scroll')
  1298 |                             && d.scrollHeight > d.clientHeight + 10;
  1299 |                     });
  1300 |                     scrollables.sort((a, b) => b.scrollHeight - a.scrollHeight);
  1301 |                     if (scrollables.length > 0) scrollables[0].scrollTop = scrollables[0].scrollHeight;
  1302 |                 });
  1303 | 
  1304 |                 const iAgreeBtn = this.page.getByRole('button', { name: /I Agree/i }).first();
  1305 |                 await iAgreeBtn.waitFor({ state: 'visible', timeout: 20000 });
  1306 |                 await expect(iAgreeBtn).toBeEnabled({ timeout: 20000 });
  1307 |                 await iAgreeBtn.click({ force: true });
  1308 | 
  1309 |                 // Wait for consent success toast.
  1310 |                 await this.page.getByText(/Employment verification consent signed successfully/i).first()
  1311 |                     .waitFor({ state: 'visible', timeout: 30000 });
  1312 |             }
  1313 | 
  1314 |             // --- Truework widget flow ---
  1315 |             // Each screen is gated through appears() so a restart that resumes
  1316 |             // mid-flow (some screens remembered) skips what's already done.
  1317 | 
  1318 |             // Screen 1: "… uses Truework for verifications" consent.
  1319 |             if (await appears(twConsentBtn, 120000)) await twConsentBtn.click();
  1320 | 
  1321 |             // Screen 2: "Complete your tasks" — the "Connect payroll" row.
  1322 |             const connectPayrollRow = twFrame.getByText(/Connect payroll/i).first();
  1323 |             if (await appears(connectPayrollRow, 15000)) await connectPayrollRow.click();
  1324 | 
  1325 |             // Screen 2b: "Find your employer" — clicking the task row opens a search;
  1326 |             // click the first result row.
  1327 |             const searchLink = twFrame.locator('[data-cy="unified_search_link"]').first();
  1328 |             if (await appears(searchLink, 15000)) await searchLink.click();
  1329 | 
  1330 |             // Screen 3: "Log in to Hitch" — sandbox credentials shown in the modal.
  1331 |             const usernameField = twFrame.getByLabel(/Username/i).first();
  1332 |             if (await appears(usernameField, 15000)) {
  1333 |                 await usernameField.fill('user_good');
  1334 |                 await twFrame.getByLabel(/Password/i).first().fill('pass_good');
  1335 |                 await twFrame.getByRole('button', { name: /^Connect$/i }).click();
  1336 |             }
  1337 | 
  1338 |             // Wait for "Awaiting Response..." to resolve and payroll to connect.
  1339 |             // Status text (not a button) — best-effort even on the first run, since
  1340 |             // a fast connect can replace it before we look.
  1341 |             await twFrame.getByText(/Successfully connected payroll/i).first()
  1342 |                 .waitFor({ state: 'visible', timeout: tolerant ? 30000 : 60000 })
  1343 |                 .catch(() => { });
  1344 | 
  1345 |             // Click "I'm done, submit" to close the Truework widget.
  1346 |             const doneBtn = twFrame.getByRole('button', { name: /I'm done, submit/i });
  1347 |             if (await appears(doneBtn, 60000)) await doneBtn.click();
  1348 |         });
  1349 |     }
  1350 | 
  1351 |     // -------------------------------------------------------------------------
  1352 | 
  1353 |     /**
  1354 |      * Income Verification & Documentation — assert the page offers all three
  1355 |      * ways a borrower can satisfy income verification:
  1356 |      *   1. Connect Checking Account         (link banking via Plaid)
  1357 |      *   2. Login to Company Payroll Account  (link payroll via The Work Number / TrueWork)
  1358 |      *   3. Upload Income Documents Manually  (manual documentation)
  1359 |      *
  1360 |      * Validates the feature contract — "borrowers can link banking and payroll
  1361 |      * securely, OR upload documents manually" — regardless of which method is
  1362 |      * ultimately completed.
  1363 |      *
  1364 |      * Only the banking/Plaid option label is confirmed against the live app
  1365 |      * (it drives the implemented fillIncomeVerification path). The payroll and
  1366 |      * manual labels are best-effort regexes derived from the option copy noted
  1367 |      * in fillIncomeVerification — TODO: confirm exact text against the live UI.
  1368 |      */
  1369 |     async verifyIncomeVerificationOptions() {
  1370 |         await test.step('Verify income verification & documentation options', async () => {
  1371 |             await this.page.waitForURL(/income-verification/i, { timeout: 60000 }).catch(() => { });
  1372 | 
  1373 |             // Banking (Plaid) — known-good copy from the implemented Plaid path.
  1374 |             const bankingOption = this.page
  1375 |                 .getByText(/Connect Checking Account|Bank Account Verification.*Plaid/i)
  1376 |                 .first();
> 1377 |             await expect(bankingOption).toBeVisible({ timeout: 90000 });
       |                                         ^ Error: expect(locator).toBeVisible() failed
  1378 | 
  1379 |             // Payroll (The Work Number / TrueWork). TODO: confirm exact copy.
  1380 |             const payrollOption = this.page
  1381 |                 .getByText(/Company Payroll Account|Login to.*Payroll|The Work Number|Payroll Account/i)
  1382 |                 .first();
  1383 |             await expect(payrollOption).toBeVisible({ timeout: 15000 });
  1384 | 
  1385 |             // Manual document upload. TODO: confirm exact copy.
  1386 |             const manualOption = this.page
  1387 |                 .getByText(/Upload Income Documents Manually|Upload.*Documents?.*Manually|Upload Manually/i)
  1388 |                 .first();
  1389 |             await expect(manualOption).toBeVisible({ timeout: 15000 });
  1390 |         });
  1391 |     }
  1392 | 
  1393 |     /**
  1394 |      * Selects one of the three income-verification methods on the Income
  1395 |      * Verification page.
  1396 |      *
  1397 |      * @param {'plaid'|'payroll'|'manual'} method
  1398 |      *
  1399 |      * Only the 'plaid' selection is confirmed against the live app today.
  1400 |      * 'payroll' and 'manual' use best-effort locators derived from the option
  1401 |      * label text — TODO: confirm against the live DOM before relying on them.
  1402 |      */
  1403 |     async selectIncomeVerificationMethod(method) {
  1404 |         await test.step(`Select income verification method: ${method}`, async () => {
  1405 |             const labels = {
  1406 |                 plaid:   /Connect Checking Account/i,
  1407 |                 payroll: /Login to.*Payroll|Company Payroll Account|The Work Number/i, // TODO: verify
  1408 |                 manual:  /Upload Income Documents Manually/i,                          // TODO: verify
  1409 |             };
  1410 |             const label = labels[method];
  1411 |             if (!label) throw new Error(`Unknown income verification method: ${method}`);
  1412 | 
  1413 |             const card = this.page.getByText(label).first();
  1414 |             await card.waitFor({ state: 'visible', timeout: 30000 });
  1415 |             await card.click({ force: true });
  1416 |         });
  1417 |     }
  1418 | 
  1419 |     /**
  1420 |      * Manual documentation path — selects "Upload Income Documents Manually"
  1421 |      * and uploads one or more files via the page's file input.
  1422 |      *
  1423 |      * BEST-EFFORT / TODO: not yet exercised against the live app. The
  1424 |      * file-input selector and the success signal below are derived from common
  1425 |      * patterns and MUST be verified once the manual-upload UI is available.
  1426 |      * setInputFiles works on a hidden <input type="file"> without it being
  1427 |      * visible, so we only wait for it to be attached.
  1428 |      *
  1429 |      * @param {string|string[]} filePaths  absolute path(s) to the document(s)
  1430 |      */
  1431 |     async uploadIncomeDocumentsManually(filePaths) {
  1432 |         await test.step('Upload income documents manually', async () => {
  1433 |             await this.selectIncomeVerificationMethod('manual');
  1434 | 
  1435 |             // TODO: verify the file-input selector against the live app.
  1436 |             const fileInput = this.page.locator('input[type="file"]').first();
  1437 |             await fileInput.waitFor({ state: 'attached', timeout: 15000 });
  1438 |             await fileInput.setInputFiles(filePaths);
  1439 | 
  1440 |             // TODO: verify the upload success signal (filename chip / "Uploaded"
  1441 |             // badge / Continue enabling) against the live app.
  1442 |             const continueBtn = this.page.getByRole('button', { name: /^Continue$/i }).first();
  1443 |             await continueBtn.waitFor({ state: 'visible', timeout: 30000 });
  1444 |             await expect(continueBtn).toBeEnabled({ timeout: 30000 });
  1445 |             await continueBtn.click({ force: true });
  1446 |         });
  1447 |     }
  1448 | 
  1449 |     /**
  1450 |      * Payroll documentation path — "Login to Your Company Payroll Account"
  1451 |      * (The Work Number / TrueWork).
  1452 |      *
  1453 |      * BEST-EFFORT STUB / TODO: not yet exercised against the live app. The
  1454 |      * payroll login renders in a third-party (TWN/TrueWork) iframe whose DOM is
  1455 |      * unknown here. Throws if invoked so it is never silently skipped — wire up
  1456 |      * the provider-select → credentials → consent steps and the verified-income
  1457 |      * success assertion once that iframe is available.
  1458 |      */
  1459 |     async completePayrollVerification(_data) {
  1460 |         await test.step('Verify income via company payroll (The Work Number)', async () => {
  1461 |             await this.selectIncomeVerificationMethod('payroll');
  1462 |             throw new Error(
  1463 |                 'completePayrollVerification is a best-effort stub — confirm the ' +
  1464 |                 'TWN/TrueWork payroll iframe DOM against the live app before enabling.'
  1465 |             );
  1466 |         });
  1467 |     }
  1468 | 
  1469 |     // -------------------------------------------------------------------------
  1470 | 
  1471 |     /**
  1472 |      * Step 17 — Funding Account page.
  1473 |      *
  1474 |      * Runs the Plaid sandbox flow to connect a bank account:
  1475 |      *   1. Click "CONNECT BANK ACCOUNT"
  1476 |      *   2. Enter sandbox phone (415-555-0011) → Continue
  1477 |      *   3. Type OTP 123456 (auto-submits after 6th digit)
```