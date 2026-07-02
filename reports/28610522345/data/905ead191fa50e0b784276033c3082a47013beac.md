# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Borrower Flow/Co-Borrower/loan-hub.spec.js >> Borrower Flow — Loan Hub >> Loan Hub shows the to-do list, document center, and loan tracker
- Location: tests/Borrower Flow/Co-Borrower/loan-hub.spec.js:135:9

# Error details

```
TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Get Started Now/i }).first() to be visible

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
            - button "Sharable App Link" [active] [ref=e70] [cursor=pointer]:
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
                - generic [ref=e81]: "462"
                - generic [ref=e82]: / $43,755,000
            - generic [ref=e84]:
              - generic [ref=e85]:
                - img [ref=e87]
                - generic [ref=e92]: Pre-Qual
              - generic [ref=e93]:
                - generic [ref=e94]: "381"
                - generic [ref=e95]: / $27,925,000
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
              - button "0 Pending MLO Certification 183 applications / $16,205,000" [ref=e142] [cursor=pointer]:
                - generic [ref=e143]:
                  - generic [ref=e144]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e145]
                  - generic [ref=e146]: 183 applications / $16,205,000
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
                    - row "Andy America, Amy America 5121231113 4556 Eliot St, Denver, CO 80211 $0 Pending MLO Certification — 0d 0h Time since application was created Certify View" [ref=e169]:
                      - cell "Andy America, Amy America 5121231113" [ref=e170]:
                        - generic [ref=e171]:
                          - link "Andy America, Amy America" [ref=e172] [cursor=pointer]:
                            - /url: /portal/loan/6a46a21eea43739567a7de37/summary/overview
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
                      - cell "Certify View" [ref=e183]:
                        - generic [ref=e184]:
                          - button "Certify" [ref=e185] [cursor=pointer]
                          - button "View" [ref=e186] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $180,000 Pending MLO Certification — 0d 1h Time since application was created Certify View" [ref=e187]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e188]:
                        - generic [ref=e189]:
                          - link "Andy America, Amy America" [ref=e190] [cursor=pointer]:
                            - /url: /portal/loan/6a468f7f18a617c0c40d1adf/summary/overview
                          - generic [ref=e191]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e192]
                      - cell "$180,000" [ref=e193]
                      - cell "Pending MLO Certification" [ref=e194]:
                        - generic [ref=e195]: Pending MLO Certification
                      - cell "—" [ref=e196]
                      - cell "0d 1h Time since application was created" [ref=e197]:
                        - generic [ref=e198]:
                          - text: 0d 1h
                          - img "Time since application was created" [ref=e199]
                      - cell "Certify View" [ref=e201]:
                        - generic [ref=e202]:
                          - button "Certify" [ref=e203] [cursor=pointer]
                          - button "View" [ref=e204] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 3h Time since application was created Certify View" [ref=e205]:
                      - cell "Andy America 5121231113" [ref=e206]:
                        - generic [ref=e207]:
                          - link "Andy America" [ref=e208] [cursor=pointer]:
                            - /url: /portal/loan/6a4674fe150c56871ea621e7/summary/overview
                          - generic [ref=e209]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e210]
                      - cell "$50,000" [ref=e211]
                      - cell "Pending MLO Certification" [ref=e212]:
                        - generic [ref=e213]: Pending MLO Certification
                      - cell "—" [ref=e214]
                      - cell "0d 3h Time since application was created" [ref=e215]:
                        - generic [ref=e216]:
                          - text: 0d 3h
                          - img "Time since application was created" [ref=e217]
                      - cell "Certify View" [ref=e219]:
                        - generic [ref=e220]:
                          - button "Certify" [ref=e221] [cursor=pointer]
                          - button "View" [ref=e222] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $180,000 Pending MLO Certification — 0d 5h Time since application was created Certify View" [ref=e223]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e224]:
                        - generic [ref=e225]:
                          - link "Andy America, Amy America" [ref=e226] [cursor=pointer]:
                            - /url: /portal/loan/6a465c8df9bc44566d666f3f/summary/overview
                          - generic [ref=e227]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e228]
                      - cell "$180,000" [ref=e229]
                      - cell "Pending MLO Certification" [ref=e230]:
                        - generic [ref=e231]: Pending MLO Certification
                      - cell "—" [ref=e232]
                      - cell "0d 5h Time since application was created" [ref=e233]:
                        - generic [ref=e234]:
                          - text: 0d 5h
                          - img "Time since application was created" [ref=e235]
                      - cell "Certify View" [ref=e237]:
                        - generic [ref=e238]:
                          - button "Certify" [ref=e239] [cursor=pointer]
                          - button "View" [ref=e240] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 0d 8h Time since application was created Certify View" [ref=e241]:
                      - cell "Andy America 5121231113" [ref=e242]:
                        - generic [ref=e243]:
                          - link "Andy America" [ref=e244] [cursor=pointer]:
                            - /url: /portal/loan/6a4632adf9bc44566d666ccc/summary/overview
                          - generic [ref=e245]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e246]
                      - cell "$50,000" [ref=e247]
                      - cell "Pending MLO Certification" [ref=e248]:
                        - generic [ref=e249]: Pending MLO Certification
                      - cell "—" [ref=e250]
                      - cell "0d 8h Time since application was created" [ref=e251]:
                        - generic [ref=e252]:
                          - text: 0d 8h
                          - img "Time since application was created" [ref=e253]
                      - cell "Certify View" [ref=e255]:
                        - generic [ref=e256]:
                          - button "Certify" [ref=e257] [cursor=pointer]
                          - button "View" [ref=e258] [cursor=pointer]
                    - row "Andy America, Amy America 512-123-1113 4556 Eliot St, Denver, CO 80211 $250,000 Pending MLO Certification — 0d 8h Time since application was created Certify View" [ref=e259]:
                      - cell "Andy America, Amy America 512-123-1113" [ref=e260]:
                        - generic [ref=e261]:
                          - link "Andy America, Amy America" [ref=e262] [cursor=pointer]:
                            - /url: /portal/loan/6a463023f9bc44566d666b6b/summary/overview
                          - generic [ref=e263]: 512-123-1113
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e264]
                      - cell "$250,000" [ref=e265]
                      - cell "Pending MLO Certification" [ref=e266]:
                        - generic [ref=e267]: Pending MLO Certification
                      - cell "—" [ref=e268]
                      - cell "0d 8h Time since application was created" [ref=e269]:
                        - generic [ref=e270]:
                          - text: 0d 8h
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
              - button "1 Pre-Qual 381 applications / $27,925,000" [ref=e284] [cursor=pointer]:
                - generic [ref=e285]:
                  - generic [ref=e286]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e287]
                  - generic [ref=e288]: 381 applications / $27,925,000
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
                    - 'row "Andy America test.qt7yp.1783014220963@mailinator.com Loan: #300000000007811 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 0 h View" [ref=e309]':
                      - 'cell "Andy America test.qt7yp.1783014220963@mailinator.com Loan: #300000000007811" [ref=e310]':
                        - generic [ref=e311]:
                          - link "Andy America" [ref=e312] [cursor=pointer]:
                            - /url: /portal/loan/6a46a35a6a7c75bc1c47ce8d/summary/overview
                          - generic [ref=e313]: test.qt7yp.1783014220963@mailinator.com
                          - generic [ref=e314]: "Loan: #300000000007811"
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
                    - 'row "Andy America test.hylv8.1783013905235@mailinator.com Loan: #300000000007810 4556 Eliot St Denver, CO 80211 $0 Ace Loan Officer 0 d 0 h View" [ref=e328]':
                      - 'cell "Andy America test.hylv8.1783013905235@mailinator.com Loan: #300000000007810" [ref=e329]':
                        - generic [ref=e330]:
                          - link "Andy America" [ref=e331] [cursor=pointer]:
                            - /url: /portal/loan/6a46a21eea43739567a7de37/summary/overview
                          - generic [ref=e332]: test.hylv8.1783013905235@mailinator.com
                          - generic [ref=e333]: "Loan: #300000000007810"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e334]:
                        - generic [ref=e335]:
                          - generic [ref=e336]: 4556 Eliot St
                          - generic [ref=e337]: Denver, CO 80211
                      - cell "$0" [ref=e338]
                      - cell "Ace Loan Officer" [ref=e339]
                      - cell "0 d 0 h" [ref=e340]:
                        - generic [ref=e341]:
                          - generic [ref=e342]: 0 d 0 h
                          - img [ref=e343]
                      - cell "View" [ref=e345]:
                        - button "View" [ref=e346] [cursor=pointer]
                    - 'row "Andy America test.negfa.1783008130101@mailinator.com Loan: #300000000007799 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e347]':
                      - 'cell "Andy America test.negfa.1783008130101@mailinator.com Loan: #300000000007799" [ref=e348]':
                        - generic [ref=e349]:
                          - link "Andy America" [ref=e350] [cursor=pointer]:
                            - /url: /portal/loan/6a468b8a5fffba44bd5133d5/summary/overview
                          - generic [ref=e351]: test.negfa.1783008130101@mailinator.com
                          - generic [ref=e352]: "Loan: #300000000007799"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e353]:
                        - generic [ref=e354]:
                          - generic [ref=e355]: 4556 Eliot St
                          - generic [ref=e356]: Denver, CO 80211
                      - cell "$100,000" [ref=e357]
                      - cell "Ace Loan Officer" [ref=e358]
                      - cell "0 d 2 h" [ref=e359]:
                        - generic [ref=e360]:
                          - generic [ref=e361]: 0 d 2 h
                          - img [ref=e362]
                      - cell "View" [ref=e364]:
                        - button "View" [ref=e365] [cursor=pointer]
                    - 'row "Andy America test.dknk8.1783007215037@mailinator.com Loan: #300000000007798 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e366]':
                      - 'cell "Andy America test.dknk8.1783007215037@mailinator.com Loan: #300000000007798" [ref=e367]':
                        - generic [ref=e368]:
                          - link "Andy America" [ref=e369] [cursor=pointer]:
                            - /url: /portal/loan/6a4687f65fffba44bd51334c/summary/overview
                          - generic [ref=e370]: test.dknk8.1783007215037@mailinator.com
                          - generic [ref=e371]: "Loan: #300000000007798"
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
                    - 'row "Andy America test.e1m9s.1783006907987@mailinator.com Loan: #300000000007796 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e385]':
                      - 'cell "Andy America test.e1m9s.1783006907987@mailinator.com Loan: #300000000007796" [ref=e386]':
                        - generic [ref=e387]:
                          - link "Andy America" [ref=e388] [cursor=pointer]:
                            - /url: /portal/loan/6a4686c25fffba44bd5132ee/summary/overview
                          - generic [ref=e389]: test.e1m9s.1783006907987@mailinator.com
                          - generic [ref=e390]: "Loan: #300000000007796"
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
                    - 'row "Andy America test.flg9f.1783005791016@mailinator.com Loan: #300000000007795 4556 Eliot St Denver, CO 80211 $100,000 Ace Loan Officer 0 d 2 h View" [ref=e404]':
                      - 'cell "Andy America test.flg9f.1783005791016@mailinator.com Loan: #300000000007795" [ref=e405]':
                        - generic [ref=e406]:
                          - link "Andy America" [ref=e407] [cursor=pointer]:
                            - /url: /portal/loan/6a4682da5fffba44bd51329c/summary/overview
                          - generic [ref=e408]: test.flg9f.1783005791016@mailinator.com
                          - generic [ref=e409]: "Loan: #300000000007795"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e410]:
                        - generic [ref=e411]:
                          - generic [ref=e412]: 4556 Eliot St
                          - generic [ref=e413]: Denver, CO 80211
                      - cell "$100,000" [ref=e414]
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
                  - button "64" [ref=e427] [cursor=pointer]
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
  - alert [ref=e453]
  - generic:
    - generic:
      - generic [ref=e455]:
        - iframe [ref=e456]:
          - button "Close message from company" [ref=f10e4] [cursor=pointer]:
            - img [ref=f10e5]
        - iframe [ref=e457]:
          - button "Hi. Need any help?" [ref=f11e5] [cursor=pointer]
      - iframe [ref=e458]:
        - button "Open messaging window" [ref=f12e5] [cursor=pointer]:
          - img [ref=f12e7]
          - img [ref=f12e10]
```

# Test source

```ts
  1   | import { expect, test } from '../../fixtures';
  2   | import HelpDeskWidget from '../Support/HelpDeskWidget';
  3   | 
  4   | class TWNPage {
  5   |     constructor(page) {
  6   |         this.page = page;
  7   |         this.helpDesk = new HelpDeskWidget(page);
  8   | 
  9   |         // -- Landing page ------------------------------------------------------
  10  |         this.getStartedNowBtn = this.page.getByRole('button', { name: /Get Started Now/i }).first();
  11  | 
  12  |         // -- Select Property Type (card-style, no button role) -----------------
  13  |         this.singleFamilyCard = this.page.getByText('Single Family', { exact: true });
  14  |         this.twoToFourUnitCard = this.page.getByText('2-4 Unit', { exact: true });
  15  |         this.condoCard         = this.page.getByText('Condo', { exact: true });
  16  | 
  17  |         // -- Loan Purpose (card-style) -----------------------------------------
  18  |         this.debtConsolidationCard  = this.page.getByText('Debt Consolidation', { exact: true });
  19  |         this.homeImprovementCard    = this.page.getByText('Home Improvement', { exact: true });
  20  |         this.otherLoanPurposeCard   = this.page.getByText('Other', { exact: true }).first();
  21  | 
  22  |         // -- Tell us about your property ---------------------------------------
  23  |         this.addressInput        = this.page.getByLabel(/Address/i).first();
  24  |         this.cityInput           = this.page.getByLabel(/City/i);
  25  |         this.countyInput         = this.page.getByLabel(/County/i);
  26  |         this.stateInput          = this.page.getByRole('combobox', { name: /State/i });
  27  |         this.zipInput            = this.page.getByLabel(/Zip/i);
  28  |         // Property Status radios — scoped to their radiogroup
  29  |         const propertyStatusGroup = this.page.getByRole('radiogroup', { name: /listed for sale|Property Status/i }).first();
  30  |         this.notListedRadio = propertyStatusGroup.getByRole('radio', { name: /No|Not listed/i }).first();
  31  |         this.listedRadio    = propertyStatusGroup.getByRole('radio', { name: /Yes|listed/i }).first();
  32  | 
  33  |         // Trust radios — aria-labels are "No for Held in trust" / "Yes for Held in trust"
  34  |         const trustGroup       = this.page.getByRole('radiogroup', { name: /Held in trust/i });
  35  |         this.trustNoRadio      = trustGroup.getByRole('radio', { name: /No/i }).first();
  36  |         this.trustYesRadio     = trustGroup.getByRole('radio', { name: /Yes/i }).first();
  37  |         this.estimatedValueInput = this.page.getByLabel(/Estimated Home Value/i)
  38  |                                        .or(this.page.getByLabel(/Estimated Value/i)).first();
  39  |         this.primaryResidenceRadio = this.page.getByRole('radio', { name: /Primary Residence/i });
  40  |         this.continueBtn         = this.page.getByRole('button', { name: /Continue/i }).first();
  41  | 
  42  |         // -- Tell us about yourself --------------------------------------------
  43  |         this.firstNameInput   = this.page.getByLabel(/First Name/i);
  44  |         this.lastNameInput    = this.page.getByLabel(/Last Name/i);
  45  |         this.emailInput       = this.page.getByLabel(/Email Address/i);
  46  |         this.phoneInput       = this.page.getByLabel(/Cell Phone Number/i)
  47  |                                     .or(this.page.getByLabel(/Phone Number/i)).first();
  48  |         this.passwordInput    = this.page.getByLabel(/^Password/i);
  49  |         this.eConsentCheckbox = this.page.locator("input[type='checkbox']");
  50  | 
  51  |         // -- Secure Identity Check (credit-check step) -------------------------
  52  |         this.ssnInput = this.page.getByLabel(/Social Security Number/i);
  53  |         this.dobInput = this.page.getByLabel(/Date of Birth/i);
  54  | 
  55  |         // -- Income Sources (TWN auto-populates) -------------------------------
  56  |         this.salaryCheckbox   = this.page.getByRole('checkbox', { name: /Salary or Hourly Wages/i });
  57  |         this.companyNameInput = this.page.getByLabel(/Company Name/i);
  58  |         this.startDateInput   = this.page.getByLabel(/Start Date/i);
  59  |         // Note: totalAnnualCompensation is rendered as read-only TEXT in the
  60  |         // verified employer card (not as an <input>), so no input locator is defined.
  61  |         // verifyTwnPopulated() checks it via getByText() instead.
  62  | 
  63  |         // -- Shared navigation -------------------------------------------------
  64  |         this.nextBtn = this.page.getByRole('button', { name: /^Next$/i }).first();
  65  |     };
  66  | 
  67  |     // -------------------------------------------------------------------------
  68  | 
  69  |     async clickGetStartedNow() {
  70  |         await test.step('Click Get Started Now', async () => {
  71  |             // Close the "Hi. Need any help?" chat bubble first — it floats over
  72  |             // the bottom-right corner and can intercept clicks on the page.
  73  |             await this.helpDesk.dismissProactiveBubble();
> 74  |             await this.getStartedNowBtn.waitFor({ state: 'visible', timeout: 15000 });
      |                                         ^ TimeoutError: locator.waitFor: Timeout 15000ms exceeded.
  75  |             await this.getStartedNowBtn.click();
  76  |         });
  77  |     };
  78  | 
  79  |     async selectPropertyType(data) {
  80  |         await test.step('Select property type', async () => {
  81  |             const map = {
  82  |                 'Single Family': this.singleFamilyCard,
  83  |                 '2-4 Unit':      this.twoToFourUnitCard,
  84  |                 'Condo':         this.condoCard,
  85  |             };
  86  |             const card = map[data.propertyType] ?? this.singleFamilyCard;
  87  |             await card.waitFor({ state: 'visible', timeout: 10000 });
  88  |             await card.click({ force: true });
  89  |         });
  90  |     };
  91  | 
  92  |     async selectLoanPurpose(data) {
  93  |         await test.step('Select loan purpose', async () => {
  94  |             const map = {
  95  |                 'Debt Consolidation': this.debtConsolidationCard,
  96  |                 'Home Improvement':   this.homeImprovementCard,
  97  |                 'Other':              this.otherLoanPurposeCard,
  98  |             };
  99  |             const card = map[data.loanPurpose] ?? this.homeImprovementCard;
  100 |             await card.waitFor({ state: 'visible', timeout: 10000 });
  101 |             await card.click({ force: true });
  102 |         });
  103 |     };
  104 | 
  105 |     async fillPropertyInfo(data) {
  106 |         await test.step('Fill property info', async () => {
  107 |             const p = data.property;
  108 | 
  109 |             await this.addressInput.waitFor({ state: 'visible', timeout: 10000 });
  110 |             await this.addressInput.fill(p.address);
  111 |             await this.addressInput.press('Tab');
  112 | 
  113 |             await this.cityInput.fill(p.city);
  114 |             await this.cityInput.press('Tab');
  115 | 
  116 |             if (p.county) {
  117 |                 await this.countyInput.fill(p.county);
  118 |                 await this.countyInput.press('Tab');
  119 |             }
  120 | 
  121 |             // State is MUI Autocomplete — fill then click the matching option
  122 |             await this.stateInput.fill(p.state);
  123 |             await this.page.getByRole('option', { name: p.state, exact: true }).click();
  124 | 
  125 |             await this.zipInput.fill(p.zip);
  126 |             await this.zipInput.press('Tab');
  127 | 
  128 |             // Property Status
  129 |             if (!p.isListed) {
  130 |                 await this.notListedRadio.check({ force: true });
  131 |             } else {
  132 |                 await this.listedRadio.check({ force: true });
  133 |             }
  134 | 
  135 |             // HELOC held in trust
  136 |             // Trust radios are the second set of Yes/No on the page
  137 |             if (!p.heldInTrust) {
  138 |                 await this.trustNoRadio.check({ force: true });
  139 |             } else {
  140 |                 await this.trustYesRadio.check({ force: true });
  141 |             }
  142 | 
  143 |             await this.estimatedValueInput.clear();
  144 |             await this.estimatedValueInput.fill(p.estimatedValue);
  145 |             await this.estimatedValueInput.press('Tab');
  146 | 
  147 |             await this.primaryResidenceRadio.check({ force: true });
  148 | 
  149 |             await this.continueBtn.scrollIntoViewIfNeeded();
  150 |             await expect(this.continueBtn).toBeEnabled({ timeout: 15000 });
  151 |             await this.continueBtn.click({ force: true });
  152 |             await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => { });
  153 |         });
  154 |     };
  155 | 
  156 |     async fillAboutYourself(data) {
  157 |         await test.step('Fill about yourself', async () => {
  158 |             const b = data.borrower;
  159 | 
  160 |             await this.firstNameInput.waitFor({ state: 'visible', timeout: 60000 });
  161 |             await this.firstNameInput.fill(b.firstName);
  162 |             await this.firstNameInput.press('Tab');
  163 | 
  164 |             await this.lastNameInput.fill(b.lastName);
  165 |             await this.lastNameInput.press('Tab');
  166 | 
  167 |             await this.emailInput.fill(b.email);
  168 |             await this.emailInput.press('Tab');
  169 | 
  170 |             await this.phoneInput.fill(b.phoneNumber);
  171 |             await this.phoneInput.press('Tab');
  172 | 
  173 |             await this.passwordInput.fill(b.password);
  174 |             await this.passwordInput.press('Tab');
```