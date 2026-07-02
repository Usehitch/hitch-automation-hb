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
                - generic [ref=e81]: "472"
                - generic [ref=e82]: / $44,505,000
            - generic [ref=e84]:
              - generic [ref=e85]:
                - img [ref=e87]
                - generic [ref=e92]: Pre-Qual
              - generic [ref=e93]:
                - generic [ref=e94]: "391"
                - generic [ref=e95]: / $28,675,000
            - generic [ref=e97]:
              - generic [ref=e98]:
                - img [ref=e100]
                - generic [ref=e102]: In Process
              - generic [ref=e103]:
                - generic [ref=e104]: "81"
                - generic [ref=e105]: / $15,830,000
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
              - button "0 Pending MLO Certification 186 applications / $16,255,000" [ref=e142] [cursor=pointer]:
                - generic [ref=e143]:
                  - generic [ref=e144]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e145]
                  - generic [ref=e146]: 186 applications / $16,255,000
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
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 2h Time since application was created Certify View" [ref=e169]:
                      - cell "Andy America 5121231113" [ref=e170]:
                        - generic [ref=e171]:
                          - link "Andy America" [ref=e172] [cursor=pointer]:
                            - /url: /portal/loan/6a46afaff4f333ec500c185a/summary/overview
                          - generic [ref=e173]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e174]
                      - cell "$0" [ref=e175]
                      - cell "Pending MLO Certification" [ref=e176]:
                        - generic [ref=e177]: Pending MLO Certification
                      - cell "—" [ref=e178]
                      - cell "0d 2h Time since application was created" [ref=e179]:
                        - generic [ref=e180]:
                          - text: 0d 2h
                          - img "Time since application was created" [ref=e181]
                      - cell "Certify View" [ref=e183]:
                        - generic [ref=e184]:
                          - button "Certify" [ref=e185] [cursor=pointer]
                          - button "View" [ref=e186] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 2h Time since application was created Certify View" [ref=e187]:
                      - cell "Andy America 5121231113" [ref=e188]:
                        - generic [ref=e189]:
                          - link "Andy America" [ref=e190] [cursor=pointer]:
                            - /url: /portal/loan/6a46aded829347c01755a4d7/summary/overview
                          - generic [ref=e191]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e192]
                      - cell "$0" [ref=e193]
                      - cell "Pending MLO Certification" [ref=e194]:
                        - generic [ref=e195]: Pending MLO Certification
                      - cell "—" [ref=e196]
                      - cell "0d 2h Time since application was created" [ref=e197]:
                        - generic [ref=e198]:
                          - text: 0d 2h
                          - img "Time since application was created" [ref=e199]
                      - cell "Certify View" [ref=e201]:
                        - generic [ref=e202]:
                          - button "Certify" [ref=e203] [cursor=pointer]
                          - button "View" [ref=e204] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 2h Time since application was created Certify View" [ref=e205]:
                      - cell "Andy America 5121231113" [ref=e206]:
                        - generic [ref=e207]:
                          - link "Andy America" [ref=e208] [cursor=pointer]:
                            - /url: /portal/loan/6a46ad00829347c01755a3b4/summary/overview
                          - generic [ref=e209]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e210]
                      - cell "$50,000" [ref=e211]
                      - cell "Pending MLO Certification" [ref=e212]:
                        - generic [ref=e213]: Pending MLO Certification
                      - cell "—" [ref=e214]
                      - cell "0d 2h Time since application was created" [ref=e215]:
                        - generic [ref=e216]:
                          - text: 0d 2h
                          - img "Time since application was created" [ref=e217]
                      - cell "Certify View" [ref=e219]:
                        - generic [ref=e220]:
                          - button "Certify" [ref=e221] [cursor=pointer]
                          - button "View" [ref=e222] [cursor=pointer]
                    - row "Andy America, Amy America 5121231113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 3h Time since application was created Certify View" [ref=e223]:
                      - cell "Andy America, Amy America 5121231113" [ref=e224]:
                        - generic [ref=e225]:
                          - link "Andy America, Amy America" [ref=e226] [cursor=pointer]:
                            - /url: /portal/loan/6a46a21eea43739567a7de37/summary/overview
                          - generic [ref=e227]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e228]
                      - cell "$0" [ref=e229]
                      - cell "Pending MLO Certification" [ref=e230]:
                        - generic [ref=e231]: Pending MLO Certification
                      - cell "—" [ref=e232]
                      - cell "0d 3h Time since application was created" [ref=e233]:
                        - generic [ref=e234]:
                          - text: 0d 3h
                          - img "Time since application was created" [ref=e235]
                      - cell "Certify View" [ref=e237]:
                        - generic [ref=e238]:
                          - button "Certify" [ref=e239] [cursor=pointer]
                          - button "View" [ref=e240] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $180,000 Pending MLO Certification — 0d 4h Time since application was created Certify View" [ref=e241]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e242]:
                        - generic [ref=e243]:
                          - link "Andy America, Amy America" [ref=e244] [cursor=pointer]:
                            - /url: /portal/loan/6a468f7f18a617c0c40d1adf/summary/overview
                          - generic [ref=e245]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e246]
                      - cell "$180,000" [ref=e247]
                      - cell "Pending MLO Certification" [ref=e248]:
                        - generic [ref=e249]: Pending MLO Certification
                      - cell "—" [ref=e250]
                      - cell "0d 4h Time since application was created" [ref=e251]:
                        - generic [ref=e252]:
                          - text: 0d 4h
                          - img "Time since application was created" [ref=e253]
                      - cell "Certify View" [ref=e255]:
                        - generic [ref=e256]:
                          - button "Certify" [ref=e257] [cursor=pointer]
                          - button "View" [ref=e258] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 6h Time since application was created Certify View" [ref=e259]:
                      - cell "Andy America 5121231113" [ref=e260]:
                        - generic [ref=e261]:
                          - link "Andy America" [ref=e262] [cursor=pointer]:
                            - /url: /portal/loan/6a4674fe150c56871ea621e7/summary/overview
                          - generic [ref=e263]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e264]
                      - cell "$50,000" [ref=e265]
                      - cell "Pending MLO Certification" [ref=e266]:
                        - generic [ref=e267]: Pending MLO Certification
                      - cell "—" [ref=e268]
                      - cell "0d 6h Time since application was created" [ref=e269]:
                        - generic [ref=e270]:
                          - text: 0d 6h
                          - img "Time since application was created" [ref=e271]
                      - cell "Certify View" [ref=e273]:
                        - generic [ref=e274]:
                          - button "Certify" [ref=e275] [cursor=pointer]
                          - button "View" [ref=e276] [cursor=pointer]
                - generic [ref=e277]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e278] [cursor=pointer]
                  - button "2" [ref=e279] [cursor=pointer]
                  - generic [ref=e280]: ...
                  - button "31" [ref=e281] [cursor=pointer]
                  - button "Next" [ref=e282] [cursor=pointer]:
                    - text: Next
                    - img
            - generic [ref=e283]:
              - button "1 Pre-Qual 391 applications / $28,675,000" [ref=e284] [cursor=pointer]:
                - generic [ref=e285]:
                  - generic [ref=e286]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e287]
                  - generic [ref=e288]: 391 applications / $28,675,000
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
                    - 'row "Andy America test.xbznd.1783025790915@mailinator.com Loan: #300000000007835 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h View" [ref=e309]':
                      - 'cell "Andy America test.xbznd.1783025790915@mailinator.com Loan: #300000000007835" [ref=e310]':
                        - generic [ref=e311]:
                          - link "Andy America" [ref=e312] [cursor=pointer]:
                            - /url: /portal/loan/6a46d0843318a485b2dd3489/summary/overview
                          - generic [ref=e313]: test.xbznd.1783025790915@mailinator.com
                          - generic [ref=e314]: "Loan: #300000000007835"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e315]:
                        - generic [ref=e316]:
                          - generic [ref=e317]: 4556 Eliot St
                          - generic [ref=e318]: Denver, CO 80211
                      - cell "$100,000" [ref=e319]
                      - cell "Ace Loan Officer" [ref=e320]
                      - cell "0 d 0 h" [ref=e321]:
                        - generic [ref=e322]:
                          - generic [ref=e323]: 0 d 0 h
                          - img [ref=e324]
                      - cell "View" [ref=e326]:
                        - button "View" [ref=e327] [cursor=pointer]
                    - 'row "Andy America test.fefkg.1783017517077@mailinator.com Loan: #300000000007829 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e328]':
                      - 'cell "Andy America test.fefkg.1783017517077@mailinator.com Loan: #300000000007829" [ref=e329]':
                        - generic [ref=e330]:
                          - link "Andy America" [ref=e331] [cursor=pointer]:
                            - /url: /portal/loan/6a46b03964fa22b28a05d804/summary/overview
                          - generic [ref=e332]: test.fefkg.1783017517077@mailinator.com
                          - generic [ref=e333]: "Loan: #300000000007829"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e334]:
                        - generic [ref=e335]:
                          - generic [ref=e336]: 4556 Eliot St
                          - generic [ref=e337]: Denver, CO 80211
                      - cell "$100,000" [ref=e338]
                      - cell "Ace Loan Officer" [ref=e339]
                      - cell "0 d 2 h" [ref=e340]:
                        - generic [ref=e341]:
                          - generic [ref=e342]: 0 d 2 h
                          - img [ref=e343]
                      - cell "View" [ref=e345]:
                        - button "View" [ref=e346] [cursor=pointer]
                    - 'row "Andy America test.yfar9.1783017385299@mailinator.com Loan: #300000000007828 4556 Eliot St Denver, CO 80211 $0 Ace Loan Officer 0 d 2 h View" [ref=e347]':
                      - 'cell "Andy America test.yfar9.1783017385299@mailinator.com Loan: #300000000007828" [ref=e348]':
                        - generic [ref=e349]:
                          - link "Andy America" [ref=e350] [cursor=pointer]:
                            - /url: /portal/loan/6a46afaff4f333ec500c185a/summary/overview
                          - generic [ref=e351]: test.yfar9.1783017385299@mailinator.com
                          - generic [ref=e352]: "Loan: #300000000007828"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e353]:
                        - generic [ref=e354]:
                          - generic [ref=e355]: 4556 Eliot St
                          - generic [ref=e356]: Denver, CO 80211
                      - cell "$0" [ref=e357]
                      - cell "Ace Loan Officer" [ref=e358]
                      - cell "0 d 2 h" [ref=e359]:
                        - generic [ref=e360]:
                          - generic [ref=e361]: 0 d 2 h
                          - img [ref=e362]
                      - cell "View" [ref=e364]:
                        - button "View" [ref=e365] [cursor=pointer]
                    - 'row "Andy America test.bzbc8.1783017243000@mailinator.com Loan: #300000000007827 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e366]':
                      - 'cell "Andy America test.bzbc8.1783017243000@mailinator.com Loan: #300000000007827" [ref=e367]':
                        - generic [ref=e368]:
                          - link "Andy America" [ref=e369] [cursor=pointer]:
                            - /url: /portal/loan/6a46af24f4f333ec500c180a/summary/overview
                          - generic [ref=e370]: test.bzbc8.1783017243000@mailinator.com
                          - generic [ref=e371]: "Loan: #300000000007827"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e372]:
                        - generic [ref=e373]:
                          - generic [ref=e374]: 4556 Eliot St
                          - generic [ref=e375]: Denver, CO 80211
                      - cell "$100,000" [ref=e376]
                      - cell "Ace Loan Officer" [ref=e377]
                      - cell "0 d 2 h" [ref=e378]:
                        - generic [ref=e379]:
                          - generic [ref=e380]: 0 d 2 h
                          - img [ref=e381]
                      - cell "View" [ref=e383]:
                        - button "View" [ref=e384] [cursor=pointer]
                    - 'row "Andy America test.mu361.1783017179147@mailinator.com Loan: #300000000007826 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e385]':
                      - 'cell "Andy America test.mu361.1783017179147@mailinator.com Loan: #300000000007826" [ref=e386]':
                        - generic [ref=e387]:
                          - link "Andy America" [ref=e388] [cursor=pointer]:
                            - /url: /portal/loan/6a46aee1f4f333ec500c17c2/summary/overview
                          - generic [ref=e389]: test.mu361.1783017179147@mailinator.com
                          - generic [ref=e390]: "Loan: #300000000007826"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e391]:
                        - generic [ref=e392]:
                          - generic [ref=e393]: 4556 Eliot St
                          - generic [ref=e394]: Denver, CO 80211
                      - cell "$100,000" [ref=e395]
                      - cell "Ace Loan Officer" [ref=e396]
                      - cell "0 d 2 h" [ref=e397]:
                        - generic [ref=e398]:
                          - generic [ref=e399]: 0 d 2 h
                          - img [ref=e400]
                      - cell "View" [ref=e402]:
                        - button "View" [ref=e403] [cursor=pointer]
                    - 'row "Andy America test.4q9ma.1783016934428@mailinator.com Loan: #300000000007825 4556 Eliot St Denver, CO 80211 $0 Ace Loan Officer 0 d 2 h View" [ref=e404]':
                      - 'cell "Andy America test.4q9ma.1783016934428@mailinator.com Loan: #300000000007825" [ref=e405]':
                        - generic [ref=e406]:
                          - link "Andy America" [ref=e407] [cursor=pointer]:
                            - /url: /portal/loan/6a46aded829347c01755a4d7/summary/overview
                          - generic [ref=e408]: test.4q9ma.1783016934428@mailinator.com
                          - generic [ref=e409]: "Loan: #300000000007825"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e410]:
                        - generic [ref=e411]:
                          - generic [ref=e412]: 4556 Eliot St
                          - generic [ref=e413]: Denver, CO 80211
                      - cell "$0" [ref=e414]
                      - cell "Ace Loan Officer" [ref=e415]
                      - cell "0 d 2 h" [ref=e416]:
                        - generic [ref=e417]:
                          - generic [ref=e418]: 0 d 2 h
                          - img [ref=e419]
                      - cell "View" [ref=e421]:
                        - button "View" [ref=e422] [cursor=pointer]
                - generic [ref=e423]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e424] [cursor=pointer]
                  - button "2" [ref=e425] [cursor=pointer]
                  - generic [ref=e426]: ...
                  - button "66" [ref=e427] [cursor=pointer]
                  - button "Next" [ref=e428] [cursor=pointer]:
                    - text: Next
                    - img
            - button "2 In Process 81 applications / $15,830,000" [ref=e430] [cursor=pointer]:
              - generic [ref=e431]:
                - generic [ref=e432]: "2"
                - heading "In Process" [level=3] [ref=e433]
                - generic [ref=e434]: 81 applications / $15,830,000
              - img [ref=e435]
            - button "3 Closing 0 applications / $0" [ref=e438] [cursor=pointer]:
              - generic [ref=e439]:
                - generic [ref=e440]: "3"
                - heading "Closing" [level=3] [ref=e441]
                - generic [ref=e442]: 0 applications / $0
              - img [ref=e443]
            - button "4 Funded 0 applications / $0" [ref=e446] [cursor=pointer]:
              - generic [ref=e447]:
                - generic [ref=e448]: "4"
                - heading "Funded" [level=3] [ref=e449]
                - generic [ref=e450]: 0 applications / $0
              - img [ref=e451]
  - alert [ref=e453]: /portal
  - generic:
    - generic:
      - generic [ref=e455]:
        - iframe [ref=e456]:
          - button "Close message from company" [ref=f7e4] [cursor=pointer]:
            - img [ref=f7e5]
        - iframe [ref=e457]:
          - button "Hi. Need any help?" [ref=f8e5] [cursor=pointer]
      - iframe [ref=e458]:
        - button "Open messaging window" [ref=f9e5] [cursor=pointer]:
          - img [ref=f9e7]
          - img [ref=f9e10]
```

# Test source

```ts
  1152 |                         'payroll income-verification step.'
  1153 |                     );
  1154 |                 }
  1155 |             }
  1156 | 
  1157 |             // Employment Authorization modal — scroll the certification to 100% so
  1158 |             // the disabled "PLEASE READ DOCUMENT ABOVE" button becomes "I Agree".
  1159 |             // Skipped on restarts where Truework already holds the signed consent.
  1160 |             // Use .MuiDialog-paper to avoid the hidden canopy__modal__container,
  1161 |             // which also carries role="dialog" and is resolved first by Playwright.
  1162 |             if (stage === 'modal') {
  1163 |                 await modal.waitFor({ state: 'visible', timeout: 120000 });
  1164 |                 await this.page.getByText(/Certification/i).first()
  1165 |                     .waitFor({ state: 'visible', timeout: 10000 });
  1166 | 
  1167 |                 // Scroll the tallest inner scrollable to the bottom — this advances
  1168 |                 // the "0% ↓" counter to 100% and swaps the button for "I Agree".
  1169 |                 await modal.evaluate(el => {
  1170 |                     const scrollables = Array.from(el.querySelectorAll('div')).filter(d => {
  1171 |                         const s = window.getComputedStyle(d);
  1172 |                         return (s.overflowY === 'auto' || s.overflowY === 'scroll')
  1173 |                             && d.scrollHeight > d.clientHeight + 10;
  1174 |                     });
  1175 |                     scrollables.sort((a, b) => b.scrollHeight - a.scrollHeight);
  1176 |                     if (scrollables.length > 0) scrollables[0].scrollTop = scrollables[0].scrollHeight;
  1177 |                 });
  1178 | 
  1179 |                 const iAgreeBtn = this.page.getByRole('button', { name: /I Agree/i }).first();
  1180 |                 await iAgreeBtn.waitFor({ state: 'visible', timeout: 20000 });
  1181 |                 await expect(iAgreeBtn).toBeEnabled({ timeout: 20000 });
  1182 |                 await iAgreeBtn.click({ force: true });
  1183 | 
  1184 |                 // Wait for consent success toast.
  1185 |                 await this.page.getByText(/Employment verification consent signed successfully/i).first()
  1186 |                     .waitFor({ state: 'visible', timeout: 30000 });
  1187 |             }
  1188 | 
  1189 |             // --- Truework widget flow ---
  1190 |             // Each screen is gated through appears() so a restart that resumes
  1191 |             // mid-flow (some screens remembered) skips what's already done.
  1192 | 
  1193 |             // Screen 1: "… uses Truework for verifications" consent.
  1194 |             if (await appears(twConsentBtn, 120000)) await twConsentBtn.click();
  1195 | 
  1196 |             // Screen 2: "Complete your tasks" — the "Connect payroll" row.
  1197 |             const connectPayrollRow = twFrame.getByText(/Connect payroll/i).first();
  1198 |             if (await appears(connectPayrollRow, 15000)) await connectPayrollRow.click();
  1199 | 
  1200 |             // Screen 2b: "Find your employer" — clicking the task row opens a search;
  1201 |             // click the first result row.
  1202 |             const searchLink = twFrame.locator('[data-cy="unified_search_link"]').first();
  1203 |             if (await appears(searchLink, 15000)) await searchLink.click();
  1204 | 
  1205 |             // Screen 3: "Log in to Hitch" — sandbox credentials shown in the modal.
  1206 |             const usernameField = twFrame.getByLabel(/Username/i).first();
  1207 |             if (await appears(usernameField, 15000)) {
  1208 |                 await usernameField.fill('user_good');
  1209 |                 await twFrame.getByLabel(/Password/i).first().fill('pass_good');
  1210 |                 await twFrame.getByRole('button', { name: /^Connect$/i }).click();
  1211 |             }
  1212 | 
  1213 |             // Wait for "Awaiting Response..." to resolve and payroll to connect.
  1214 |             // Status text (not a button) — best-effort even on the first run, since
  1215 |             // a fast connect can replace it before we look.
  1216 |             await twFrame.getByText(/Successfully connected payroll/i).first()
  1217 |                 .waitFor({ state: 'visible', timeout: tolerant ? 30000 : 60000 })
  1218 |                 .catch(() => { });
  1219 | 
  1220 |             // Click "I'm done, submit" to close the Truework widget.
  1221 |             const doneBtn = twFrame.getByRole('button', { name: /I'm done, submit/i });
  1222 |             if (await appears(doneBtn, 60000)) await doneBtn.click();
  1223 |         });
  1224 |     }
  1225 | 
  1226 |     // -------------------------------------------------------------------------
  1227 | 
  1228 |     /**
  1229 |      * Income Verification & Documentation — assert the page offers all three
  1230 |      * ways a borrower can satisfy income verification:
  1231 |      *   1. Connect Checking Account         (link banking via Plaid)
  1232 |      *   2. Login to Company Payroll Account  (link payroll via The Work Number / TrueWork)
  1233 |      *   3. Upload Income Documents Manually  (manual documentation)
  1234 |      *
  1235 |      * Validates the feature contract — "borrowers can link banking and payroll
  1236 |      * securely, OR upload documents manually" — regardless of which method is
  1237 |      * ultimately completed.
  1238 |      *
  1239 |      * Only the banking/Plaid option label is confirmed against the live app
  1240 |      * (it drives the implemented fillIncomeVerification path). The payroll and
  1241 |      * manual labels are best-effort regexes derived from the option copy noted
  1242 |      * in fillIncomeVerification — TODO: confirm exact text against the live UI.
  1243 |      */
  1244 |     async verifyIncomeVerificationOptions() {
  1245 |         await test.step('Verify income verification & documentation options', async () => {
  1246 |             await this.page.waitForURL(/income-verification/i, { timeout: 60000 }).catch(() => { });
  1247 | 
  1248 |             // Banking (Plaid) — known-good copy from the implemented Plaid path.
  1249 |             const bankingOption = this.page
  1250 |                 .getByText(/Connect Checking Account|Bank Account Verification.*Plaid/i)
  1251 |                 .first();
> 1252 |             await expect(bankingOption).toBeVisible({ timeout: 90000 });
       |                                         ^ Error: expect(locator).toBeVisible() failed
  1253 | 
  1254 |             // Payroll (The Work Number / TrueWork). TODO: confirm exact copy.
  1255 |             const payrollOption = this.page
  1256 |                 .getByText(/Company Payroll Account|Login to.*Payroll|The Work Number|Payroll Account/i)
  1257 |                 .first();
  1258 |             await expect(payrollOption).toBeVisible({ timeout: 15000 });
  1259 | 
  1260 |             // Manual document upload. TODO: confirm exact copy.
  1261 |             const manualOption = this.page
  1262 |                 .getByText(/Upload Income Documents Manually|Upload.*Documents?.*Manually|Upload Manually/i)
  1263 |                 .first();
  1264 |             await expect(manualOption).toBeVisible({ timeout: 15000 });
  1265 |         });
  1266 |     }
  1267 | 
  1268 |     /**
  1269 |      * Selects one of the three income-verification methods on the Income
  1270 |      * Verification page.
  1271 |      *
  1272 |      * @param {'plaid'|'payroll'|'manual'} method
  1273 |      *
  1274 |      * Only the 'plaid' selection is confirmed against the live app today.
  1275 |      * 'payroll' and 'manual' use best-effort locators derived from the option
  1276 |      * label text — TODO: confirm against the live DOM before relying on them.
  1277 |      */
  1278 |     async selectIncomeVerificationMethod(method) {
  1279 |         await test.step(`Select income verification method: ${method}`, async () => {
  1280 |             const labels = {
  1281 |                 plaid:   /Connect Checking Account/i,
  1282 |                 payroll: /Login to.*Payroll|Company Payroll Account|The Work Number/i, // TODO: verify
  1283 |                 manual:  /Upload Income Documents Manually/i,                          // TODO: verify
  1284 |             };
  1285 |             const label = labels[method];
  1286 |             if (!label) throw new Error(`Unknown income verification method: ${method}`);
  1287 | 
  1288 |             const card = this.page.getByText(label).first();
  1289 |             await card.waitFor({ state: 'visible', timeout: 30000 });
  1290 |             await card.click({ force: true });
  1291 |         });
  1292 |     }
  1293 | 
  1294 |     /**
  1295 |      * Manual documentation path — selects "Upload Income Documents Manually"
  1296 |      * and uploads one or more files via the page's file input.
  1297 |      *
  1298 |      * BEST-EFFORT / TODO: not yet exercised against the live app. The
  1299 |      * file-input selector and the success signal below are derived from common
  1300 |      * patterns and MUST be verified once the manual-upload UI is available.
  1301 |      * setInputFiles works on a hidden <input type="file"> without it being
  1302 |      * visible, so we only wait for it to be attached.
  1303 |      *
  1304 |      * @param {string|string[]} filePaths  absolute path(s) to the document(s)
  1305 |      */
  1306 |     async uploadIncomeDocumentsManually(filePaths) {
  1307 |         await test.step('Upload income documents manually', async () => {
  1308 |             await this.selectIncomeVerificationMethod('manual');
  1309 | 
  1310 |             // TODO: verify the file-input selector against the live app.
  1311 |             const fileInput = this.page.locator('input[type="file"]').first();
  1312 |             await fileInput.waitFor({ state: 'attached', timeout: 15000 });
  1313 |             await fileInput.setInputFiles(filePaths);
  1314 | 
  1315 |             // TODO: verify the upload success signal (filename chip / "Uploaded"
  1316 |             // badge / Continue enabling) against the live app.
  1317 |             const continueBtn = this.page.getByRole('button', { name: /^Continue$/i }).first();
  1318 |             await continueBtn.waitFor({ state: 'visible', timeout: 30000 });
  1319 |             await expect(continueBtn).toBeEnabled({ timeout: 30000 });
  1320 |             await continueBtn.click({ force: true });
  1321 |         });
  1322 |     }
  1323 | 
  1324 |     /**
  1325 |      * Payroll documentation path — "Login to Your Company Payroll Account"
  1326 |      * (The Work Number / TrueWork).
  1327 |      *
  1328 |      * BEST-EFFORT STUB / TODO: not yet exercised against the live app. The
  1329 |      * payroll login renders in a third-party (TWN/TrueWork) iframe whose DOM is
  1330 |      * unknown here. Throws if invoked so it is never silently skipped — wire up
  1331 |      * the provider-select → credentials → consent steps and the verified-income
  1332 |      * success assertion once that iframe is available.
  1333 |      */
  1334 |     async completePayrollVerification(_data) {
  1335 |         await test.step('Verify income via company payroll (The Work Number)', async () => {
  1336 |             await this.selectIncomeVerificationMethod('payroll');
  1337 |             throw new Error(
  1338 |                 'completePayrollVerification is a best-effort stub — confirm the ' +
  1339 |                 'TWN/TrueWork payroll iframe DOM against the live app before enabling.'
  1340 |             );
  1341 |         });
  1342 |     }
  1343 | 
  1344 |     // -------------------------------------------------------------------------
  1345 | 
  1346 |     /**
  1347 |      * Step 17 — Funding Account page.
  1348 |      *
  1349 |      * Runs the Plaid sandbox flow to connect a bank account:
  1350 |      *   1. Click "CONNECT BANK ACCOUNT"
  1351 |      *   2. Enter sandbox phone (415-555-0011) → Continue
  1352 |      *   3. Type OTP 123456 (auto-submits after 6th digit)
```