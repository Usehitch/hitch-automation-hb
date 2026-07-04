# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Broker Flow/twn-monitor.spec.js >> The Work Number (TWN) >> TWN populates borrower info via shareable link
- Location: tests/Broker Flow/twn-monitor.spec.js:10:9

# Error details

```
Error: expect(locator).toBeChecked() failed

Locator:  getByRole('checkbox', { name: /Salary or Hourly Wages/i })
Expected: checked
Received: unchecked
Timeout:  30000ms

Call log:
  - Expect "toBeChecked" with timeout 30000ms
  - waiting for getByRole('checkbox', { name: /Salary or Hourly Wages/i })
    34 × locator resolved to <input type="checkbox" data-indeterminate="false" class="PrivateSwitchBase-input css-1m9pwf3"/>
       - unexpected value "unchecked"

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
          - generic [ref=e15]: HB Test Broker-REMN
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
            - button "Manage Users" [ref=e35] [cursor=pointer]:
              - img [ref=e36]
              - text: Manage Users
          - listitem [ref=e41]:
            - button "Companies" [ref=e43] [cursor=pointer]:
              - img [ref=e44]
              - text: Companies
          - listitem [ref=e48]:
            - button "Company Branches" [ref=e50] [cursor=pointer]:
              - img [ref=e51]
              - text: Company Branches
          - listitem [ref=e56]:
            - button "Quick Pricer" [ref=e58] [cursor=pointer]:
              - img [ref=e59]
              - text: Quick Pricer
          - listitem [ref=e61]:
            - button "Release Notes" [ref=e63] [cursor=pointer]:
              - img [ref=e64]
              - text: Release Notes
        - listitem [ref=e70]:
          - button "Show Old Design" [ref=e72] [cursor=pointer]:
            - img [ref=e73]
            - text: Show Old Design
      - list [ref=e76]:
        - listitem [ref=e77]:
          - button "HR HELIX REMN TestMLO stg_helix_remn_mlo@homebridge.com" [ref=e78] [cursor=pointer]:
            - generic [ref=e80]: HR
            - generic [ref=e81]:
              - paragraph [ref=e82]: HELIX REMN TestMLO
              - paragraph [ref=e83]: stg_helix_remn_mlo@homebridge.com
            - img [ref=e84]
    - main [ref=e88]:
      - generic [ref=e89]:
        - generic [ref=e90]:
          - heading "My Loans" [level=1] [ref=e91]
          - generic [ref=e92]:
            - button "Sharable App Link" [active] [ref=e93] [cursor=pointer]:
              - img
              - text: Sharable App Link
            - button "Start App" [ref=e94] [cursor=pointer]:
              - img
              - text: Start App
        - generic [ref=e95]:
          - heading "Overview" [level=2] [ref=e97]
          - generic [ref=e98]:
            - generic [ref=e100]:
              - generic [ref=e102]: My Loans
              - generic [ref=e103]:
                - generic [ref=e104]: "186"
                - generic [ref=e105]: / $20,206,002
            - generic [ref=e107]:
              - generic [ref=e108]:
                - img [ref=e110]
                - generic [ref=e115]: Pre-Qual
              - generic [ref=e116]:
                - generic [ref=e117]: "104"
                - generic [ref=e118]: / $6,880,878
            - generic [ref=e120]:
              - generic [ref=e121]:
                - img [ref=e123]
                - generic [ref=e125]: In Process
              - generic [ref=e126]:
                - generic [ref=e127]: "82"
                - generic [ref=e128]: / $13,325,124
            - generic [ref=e130]:
              - generic [ref=e131]:
                - img [ref=e133]
                - generic [ref=e135]: Closing
              - generic [ref=e136]:
                - generic [ref=e137]: "0"
                - generic [ref=e138]: / $0
            - generic [ref=e140]:
              - generic [ref=e141]:
                - img [ref=e143]
                - generic [ref=e145]: Funded
              - generic [ref=e146]:
                - generic [ref=e147]: "0"
                - generic [ref=e148]: / $0
        - generic [ref=e149]:
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]:
                - img [ref=e153]
                - textbox "Search by email, name, full address or loan number" [ref=e156]
              - button "Filter" [ref=e158] [cursor=pointer]:
                - img
                - text: Filter
            - tablist "View mode" [ref=e159]:
              - tab "List" [selected] [ref=e160] [cursor=pointer]:
                - img [ref=e162]
                - text: List
          - generic [ref=e163]:
            - generic [ref=e164]:
              - button "0 Pending MLO Certification 101 applications / $8,743,803" [ref=e165] [cursor=pointer]:
                - generic [ref=e166]:
                  - generic [ref=e167]: "0"
                  - heading "Pending MLO Certification" [level=3] [ref=e168]
                  - generic [ref=e169]: 101 applications / $8,743,803
                - img [ref=e170]
              - generic [ref=e173]:
                - table [ref=e175]:
                  - rowgroup [ref=e176]:
                    - row "Applicant Property Address Loan Amount Status LO Assistant Time in Stage" [ref=e177]:
                      - columnheader "Applicant" [ref=e178]:
                        - generic [ref=e179]: Applicant
                      - columnheader "Property Address" [ref=e180]:
                        - generic [ref=e181]: Property Address
                      - columnheader "Loan Amount" [ref=e182]:
                        - generic [ref=e183]: Loan Amount
                      - columnheader "Status" [ref=e184]:
                        - generic [ref=e185]: Status
                      - columnheader "LO Assistant" [ref=e186]:
                        - generic [ref=e187]: LO Assistant
                      - columnheader "Time in Stage" [ref=e188]:
                        - generic [ref=e189]: Time in Stage
                      - columnheader [ref=e190]
                  - rowgroup [ref=e191]:
                    - row "Andy America 5121231113 4556 ELIOT ST, DENVER, CO 80211 $0 Pending MLO Certification — 0d 0h Time since application was created Certify" [ref=e192]:
                      - cell "Andy America 5121231113" [ref=e193]:
                        - generic [ref=e194]:
                          - link "Andy America" [ref=e195] [cursor=pointer]:
                            - /url: /portal/loan/6a48bebaf2db321a29bf214f/summary/overview
                          - generic [ref=e196]: "5121231113"
                      - cell "4556 ELIOT ST, DENVER, CO 80211" [ref=e197]
                      - cell "$0" [ref=e198]
                      - cell "Pending MLO Certification" [ref=e199]:
                        - generic [ref=e200]: Pending MLO Certification
                      - cell "—" [ref=e201]
                      - cell "0d 0h Time since application was created" [ref=e202]:
                        - generic [ref=e203]:
                          - text: 0d 0h
                          - img "Time since application was created" [ref=e204]
                      - cell "Certify" [ref=e206]:
                        - generic [ref=e207]:
                          - button "More Actions" [ref=e208] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e209] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 1d 0h Time since application was created Certify" [ref=e210]:
                      - cell "Andy America 5121231113" [ref=e211]:
                        - generic [ref=e212]:
                          - link "Andy America" [ref=e213] [cursor=pointer]:
                            - /url: /portal/loan/6a47668dfe721e1372402d32/summary/overview
                          - generic [ref=e214]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e215]
                      - cell "$50,000" [ref=e216]
                      - cell "Pending MLO Certification" [ref=e217]:
                        - generic [ref=e218]: Pending MLO Certification
                      - cell "—" [ref=e219]
                      - cell "1d 0h Time since application was created" [ref=e220]:
                        - generic [ref=e221]:
                          - text: 1d 0h
                          - img "Time since application was created" [ref=e222]
                      - cell "Certify" [ref=e224]:
                        - generic [ref=e225]:
                          - button "More Actions" [ref=e226] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e227] [cursor=pointer]
                    - row "Amy America 9832759280 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 1d 2h Time since application was created Certify" [ref=e228]:
                      - cell "Amy America 9832759280" [ref=e229]:
                        - generic [ref=e230]:
                          - link "Amy America" [ref=e231] [cursor=pointer]:
                            - /url: /portal/loan/6a474855fe721e1372402a91/summary/overview
                          - generic [ref=e232]: "9832759280"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e233]
                      - cell "$50,000" [ref=e234]
                      - cell "Pending MLO Certification" [ref=e235]:
                        - generic [ref=e236]: Pending MLO Certification
                      - cell "—" [ref=e237]
                      - cell "1d 2h Time since application was created" [ref=e238]:
                        - generic [ref=e239]:
                          - text: 1d 2h
                          - img "Time since application was created" [ref=e240]
                      - cell "Certify" [ref=e242]:
                        - generic [ref=e243]:
                          - button "More Actions" [ref=e244] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e245] [cursor=pointer]
                    - row "Andy America 3025614161 43571 FREEPORT PL, STERLING, VA 20166 $300,000 Pending MLO Certification — 1d 9h Time since application was created Certify" [ref=e246]:
                      - cell "Andy America 3025614161" [ref=e247]:
                        - generic [ref=e248]:
                          - link "Andy America" [ref=e249] [cursor=pointer]:
                            - /url: /portal/loan/6a46e702fe721e1372402a26/summary/overview
                          - generic [ref=e250]: "3025614161"
                      - cell "43571 FREEPORT PL, STERLING, VA 20166" [ref=e251]
                      - cell "$300,000" [ref=e252]
                      - cell "Pending MLO Certification" [ref=e253]:
                        - generic [ref=e254]: Pending MLO Certification
                      - cell "—" [ref=e255]
                      - cell "1d 9h Time since application was created" [ref=e256]:
                        - generic [ref=e257]:
                          - text: 1d 9h
                          - img "Time since application was created" [ref=e258]
                      - cell "Certify" [ref=e260]:
                        - generic [ref=e261]:
                          - button "More Actions" [ref=e262] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e263] [cursor=pointer]
                    - row "Andy America 5121231113 4556 Eliot St, Denver, CO 80211 $50,000 Pending MLO Certification — 2d 0h Time since application was created Certify" [ref=e264]:
                      - cell "Andy America 5121231113" [ref=e265]:
                        - generic [ref=e266]:
                          - link "Andy America" [ref=e267] [cursor=pointer]:
                            - /url: /portal/loan/6a4616b90a933de550c98c38/summary/overview
                          - generic [ref=e268]: "5121231113"
                      - cell "4556 Eliot St, Denver, CO 80211" [ref=e269]
                      - cell "$50,000" [ref=e270]
                      - cell "Pending MLO Certification" [ref=e271]:
                        - generic [ref=e272]: Pending MLO Certification
                      - cell "—" [ref=e273]
                      - cell "2d 0h Time since application was created" [ref=e274]:
                        - generic [ref=e275]:
                          - text: 2d 0h
                          - img "Time since application was created" [ref=e276]
                      - cell "Certify" [ref=e278]:
                        - generic [ref=e279]:
                          - button "More Actions" [ref=e280] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e281] [cursor=pointer]
                    - row "Andy America, Amy America 5121231113 4556 ELIOT ST, DENVER, CO 80211 $180,000 Pending MLO Certification — 2d 0h Time since application was created Certify" [ref=e282]:
                      - cell "Andy America, Amy America 5121231113" [ref=e283]:
                        - generic [ref=e284]:
                          - link "Andy America, Amy America" [ref=e285] [cursor=pointer]:
                            - /url: /portal/loan/6a4614590a933de550c98a7f/summary/overview
                          - generic [ref=e286]: "5121231113"
                      - cell "4556 ELIOT ST, DENVER, CO 80211" [ref=e287]
                      - cell "$180,000" [ref=e288]
                      - cell "Pending MLO Certification" [ref=e289]:
                        - generic [ref=e290]: Pending MLO Certification
                      - cell "—" [ref=e291]
                      - cell "2d 0h Time since application was created" [ref=e292]:
                        - generic [ref=e293]:
                          - text: 2d 0h
                          - img "Time since application was created" [ref=e294]
                      - cell "Certify" [ref=e296]:
                        - generic [ref=e297]:
                          - button "More Actions" [ref=e298] [cursor=pointer]:
                            - img
                          - button "Certify" [ref=e299] [cursor=pointer]
                - generic [ref=e300]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e301] [cursor=pointer]
                  - button "2" [ref=e302] [cursor=pointer]
                  - generic [ref=e303]: ...
                  - button "17" [ref=e304] [cursor=pointer]
                  - button "Next" [ref=e305] [cursor=pointer]:
                    - text: Next
                    - img
            - generic [ref=e306]:
              - button "1 Pre-Qual 104 applications / $6,880,878" [ref=e307] [cursor=pointer]:
                - generic [ref=e308]:
                  - generic [ref=e309]: "1"
                  - heading "Pre-Qual" [level=3] [ref=e310]
                  - generic [ref=e311]: 104 applications / $6,880,878
                - img [ref=e312]
              - generic [ref=e315]:
                - table [ref=e317]:
                  - rowgroup [ref=e318]:
                    - row "Applicant Property Address Loan Amount Processor / LOA Time in Stage" [ref=e319]:
                      - columnheader "Applicant" [ref=e320]:
                        - generic [ref=e321]: Applicant
                      - columnheader "Property Address" [ref=e322]:
                        - generic [ref=e323]: Property Address
                      - columnheader "Loan Amount" [ref=e324]:
                        - generic [ref=e325]: Loan Amount
                      - columnheader "Processor / LOA" [ref=e326]:
                        - generic [ref=e327]: Processor / LOA
                      - columnheader "Time in Stage" [ref=e328]:
                        - generic [ref=e329]: Time in Stage
                      - columnheader [ref=e330]
                  - rowgroup [ref=e331]:
                    - row "Andy America 5121231113 4556 ELIOT ST DENVER, CO 80211 $0 - 0 d 0 h" [ref=e332]:
                      - cell "Andy America 5121231113" [ref=e333]:
                        - generic [ref=e334]:
                          - link "Andy America" [ref=e335] [cursor=pointer]:
                            - /url: /portal/loan/6a48bebaf2db321a29bf214f/summary/overview
                          - generic [ref=e336]: "5121231113"
                      - cell "4556 ELIOT ST DENVER, CO 80211" [ref=e337]:
                        - generic [ref=e338]:
                          - generic [ref=e339]: 4556 ELIOT ST
                          - generic [ref=e340]: DENVER, CO 80211
                      - cell "$0" [ref=e341]
                      - cell "-" [ref=e342]
                      - cell "0 d 0 h" [ref=e343]:
                        - generic [ref=e344]:
                          - generic [ref=e345]: 0 d 0 h
                          - img [ref=e346]
                      - cell [ref=e348]:
                        - button "More Actions" [ref=e349] [cursor=pointer]:
                          - img
                    - row "Andy America, Amy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 HELIX REMN TestMLO 0 d 0 h" [ref=e350]:
                      - cell "Andy America, Amy America 5121231113" [ref=e351]:
                        - generic [ref=e352]:
                          - link "Andy America, Amy America" [ref=e353] [cursor=pointer]:
                            - /url: /portal/loan/6a48b769f2db321a29bf20fb/summary/overview
                          - generic [ref=e354]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e355]:
                        - generic [ref=e356]:
                          - generic [ref=e357]: 4556 Eliot St
                          - generic [ref=e358]: Denver, CO 80211
                      - cell "$100,000" [ref=e359]
                      - cell "HELIX REMN TestMLO" [ref=e360]
                      - cell "0 d 0 h" [ref=e361]:
                        - generic [ref=e362]:
                          - generic [ref=e363]: 0 d 0 h
                          - img [ref=e364]
                      - cell [ref=e366]:
                        - button "More Actions" [ref=e367] [cursor=pointer]:
                          - img
                    - row "Andy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 HELIX REMN TestMLO 0 d 0 h" [ref=e368]:
                      - cell "Andy America 5121231113" [ref=e369]:
                        - generic [ref=e370]:
                          - link "Andy America" [ref=e371] [cursor=pointer]:
                            - /url: /portal/loan/6a48b6fff2db321a29bf20af/summary/overview
                          - generic [ref=e372]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e373]:
                        - generic [ref=e374]:
                          - generic [ref=e375]: 4556 Eliot St
                          - generic [ref=e376]: Denver, CO 80211
                      - cell "$100,000" [ref=e377]
                      - cell "HELIX REMN TestMLO" [ref=e378]
                      - cell "0 d 0 h" [ref=e379]:
                        - generic [ref=e380]:
                          - generic [ref=e381]: 0 d 0 h
                          - img [ref=e382]
                      - cell [ref=e384]:
                        - button "More Actions" [ref=e385] [cursor=pointer]:
                          - img
                    - row "Andy America, Amy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 HELIX REMN TestMLO 0 d 0 h" [ref=e386]:
                      - cell "Andy America, Amy America 5121231113" [ref=e387]:
                        - generic [ref=e388]:
                          - link "Andy America, Amy America" [ref=e389] [cursor=pointer]:
                            - /url: /portal/loan/6a48b396f2db321a29bf205a/summary/overview
                          - generic [ref=e390]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e391]:
                        - generic [ref=e392]:
                          - generic [ref=e393]: 4556 Eliot St
                          - generic [ref=e394]: Denver, CO 80211
                      - cell "$100,000" [ref=e395]
                      - cell "HELIX REMN TestMLO" [ref=e396]
                      - cell "0 d 0 h" [ref=e397]:
                        - generic [ref=e398]:
                          - generic [ref=e399]: 0 d 0 h
                          - img [ref=e400]
                      - cell [ref=e402]:
                        - button "More Actions" [ref=e403] [cursor=pointer]:
                          - img
                    - row "Andy America, Amy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 HELIX REMN TestMLO 0 d 0 h" [ref=e404]:
                      - cell "Andy America, Amy America 5121231113" [ref=e405]:
                        - generic [ref=e406]:
                          - link "Andy America, Amy America" [ref=e407] [cursor=pointer]:
                            - /url: /portal/loan/6a48b2e3f2db321a29bf2006/summary/overview
                          - generic [ref=e408]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e409]:
                        - generic [ref=e410]:
                          - generic [ref=e411]: 4556 Eliot St
                          - generic [ref=e412]: Denver, CO 80211
                      - cell "$100,000" [ref=e413]
                      - cell "HELIX REMN TestMLO" [ref=e414]
                      - cell "0 d 0 h" [ref=e415]:
                        - generic [ref=e416]:
                          - generic [ref=e417]: 0 d 0 h
                          - img [ref=e418]
                      - cell [ref=e420]:
                        - button "More Actions" [ref=e421] [cursor=pointer]:
                          - img
                    - row "Andy America, Amy America 5121231113 4556 Eliot St Denver, CO 80211 $100,000 HELIX REMN TestMLO 0 d 0 h" [ref=e422]:
                      - cell "Andy America, Amy America 5121231113" [ref=e423]:
                        - generic [ref=e424]:
                          - link "Andy America, Amy America" [ref=e425] [cursor=pointer]:
                            - /url: /portal/loan/6a48b1fcf2db321a29bf1f7c/summary/overview
                          - generic [ref=e426]: "5121231113"
                      - cell "4556 Eliot St Denver, CO 80211" [ref=e427]:
                        - generic [ref=e428]:
                          - generic [ref=e429]: 4556 Eliot St
                          - generic [ref=e430]: Denver, CO 80211
                      - cell "$100,000" [ref=e431]
                      - cell "HELIX REMN TestMLO" [ref=e432]
                      - cell "0 d 0 h" [ref=e433]:
                        - generic [ref=e434]:
                          - generic [ref=e435]: 0 d 0 h
                          - img [ref=e436]
                      - cell [ref=e438]:
                        - button "More Actions" [ref=e439] [cursor=pointer]:
                          - img
                - generic [ref=e440]:
                  - button "Previous" [disabled]:
                    - img
                    - text: Previous
                  - button "1" [ref=e441] [cursor=pointer]
                  - button "2" [ref=e442] [cursor=pointer]
                  - generic [ref=e443]: ...
                  - button "18" [ref=e444] [cursor=pointer]
                  - button "Next" [ref=e445] [cursor=pointer]:
                    - text: Next
                    - img
            - button "2 In Process 82 applications / $13,325,124" [ref=e447] [cursor=pointer]:
              - generic [ref=e448]:
                - generic [ref=e449]: "2"
                - heading "In Process" [level=3] [ref=e450]
                - generic [ref=e451]: 82 applications / $13,325,124
              - img [ref=e452]
            - button "3 Closing 0 applications / $0" [ref=e455] [cursor=pointer]:
              - generic [ref=e456]:
                - generic [ref=e457]: "3"
                - heading "Closing" [level=3] [ref=e458]
                - generic [ref=e459]: 0 applications / $0
              - img [ref=e460]
            - button "4 Funded 0 applications / $0" [ref=e463] [cursor=pointer]:
              - generic [ref=e464]:
                - generic [ref=e465]: "4"
                - heading "Funded" [level=3] [ref=e466]
                - generic [ref=e467]: 0 applications / $0
              - img [ref=e468]
  - alert [ref=e470]
  - generic:
    - generic:
      - generic [ref=e472]:
        - iframe [ref=e473]:
          - button "Close message from company" [ref=f10e4] [cursor=pointer]:
            - img [ref=f10e5]
        - iframe [ref=e474]:
          - button "Get More Help!" [ref=f11e5] [cursor=pointer]
      - iframe [ref=e475]:
        - button "Open messaging window" [ref=f12e5] [cursor=pointer]:
          - img [ref=f12e7]
          - img [ref=f12e10]
```

# Test source

```ts
  186 |         await test.step('Fill credit check fields (TWN)', async () => {
  187 |             const cc = data.creditCheck;
  188 | 
  189 |             // The prior "Tell us about yourself" Continue submit goes to the
  190 |             // staging POS backend, which can be slow to respond (Render). Allow
  191 |             // extra time for it to process and render the credit-check page.
  192 |             await this.ssnInput.waitFor({ state: 'visible', timeout: 60000 });
  193 |             await this.ssnInput.fill(cc.ssn);
  194 |             await this.ssnInput.press('Tab');
  195 | 
  196 |             await this.dobInput.fill(cc.dateOfBirth);
  197 |             await this.dobInput.press('Tab');
  198 |         });
  199 |     };
  200 | 
  201 |     /**
  202 |      * Fills the primary borrower's income sources when TWN did not auto-populate.
  203 |      * Selects each income source checkbox, then fills company name,
  204 |      * total annual compensation, and start date for salary income.
  205 |      *
  206 |      * @param {object} data  data.primaryIncome — incomeSources, companyName,
  207 |      *                       annualCompensation, startDate
  208 |      */
  209 |     async fillPrimaryIncomeSources(data) {
  210 |         await test.step('Fill primary borrower income sources', async () => {
  211 |             const inc = data.primaryIncome ?? {};
  212 | 
  213 |             // Wait for the income sources section to appear
  214 |             await this.page.getByText(/What are your income sources/i)
  215 |                 .first()
  216 |                 .waitFor({ state: 'visible', timeout: 15000 });
  217 | 
  218 |             for (const source of (inc.incomeSources ?? [])) {
  219 |                 const checkbox = this.page.getByRole('checkbox', {
  220 |                     name: new RegExp(source, 'i'),
  221 |                 });
  222 |                 const alreadyChecked = await checkbox.isChecked().catch(() => false);
  223 |                 if (!alreadyChecked) {
  224 |                     await checkbox.evaluate(el => el.click());
  225 |                 }
  226 |             }
  227 | 
  228 |             // Prod (2026-07) auto-verifies employment via TWN at this step:
  229 |             // a banner ("We were able to automatically identify and pre-fill
  230 |             // your employer information") plus a read-only Verified employer
  231 |             // card replace the manual job form. There is nothing to type —
  232 |             // and the leftover compensation input never passes Playwright's
  233 |             // stability check, so clicking it burns the whole test timeout.
  234 |             // Staging still renders the manual form, so this is detected from
  235 |             // the page, not the environment.
  236 |             const twnPrefilled = await this.page
  237 |                 .getByText(/pre-?fill your employer information|verified through The Work Number/i)
  238 |                 .first()
  239 |                 .isVisible({ timeout: 3000 })
  240 |                 .catch(() => false);
  241 | 
  242 |             // Job details — only when salary income is selected and TWN did
  243 |             // not already populate a verified employer card
  244 |             if (!twnPrefilled && (inc.incomeSources ?? []).some(s => /salary|hourly/i.test(s))) {
  245 |                 if (inc.companyName) {
  246 |                     const companyInput = this.page.getByPlaceholder(/Company Name/i).first()
  247 |                         .or(this.page.getByLabel(/Company Name/i).first());
  248 |                     await companyInput.waitFor({ state: 'visible', timeout: 10000 });
  249 |                     await companyInput.fill(inc.companyName);
  250 |                 }
  251 | 
  252 |                 if (inc.annualCompensation) {
  253 |                     const compInput = this.page
  254 |                         .getByLabel(/Total Annual Compensation|Annual Compensation/i).first();
  255 |                     await compInput.waitFor({ state: 'visible', timeout: 10000 });
  256 |                     // fill() replaces the content itself (no select-all click
  257 |                     // needed) and skips click's stability check — the prod
  258 |                     // income section re-renders continuously, which left a
  259 |                     // click({ clickCount: 3 }) retrying "element is not
  260 |                     // stable" until the test timeout. Bound it so a genuine
  261 |                     // failure surfaces in seconds, not 480 s.
  262 |                     await compInput.fill(inc.annualCompensation, { timeout: 15000 });
  263 |                     await compInput.press('Tab');
  264 |                 }
  265 | 
  266 |                 if (inc.startDate) {
  267 |                     const startInput = this.page.getByPlaceholder(/Start Date/i).first()
  268 |                         .or(this.page.getByLabel(/Start Date/i).first());
  269 |                     await startInput.waitFor({ state: 'visible', timeout: 10000 });
  270 |                     await startInput.fill(inc.startDate);
  271 |                     await startInput.press('Tab');
  272 |                 }
  273 |             }
  274 |         });
  275 |     };
  276 | 
  277 |     /**
  278 |      * Asserts TWN populated the Salary or Hourly Wages checkbox and employer
  279 |      * card fields. Skips individual field checks when expected value is null.
  280 |      */
  281 |     async verifyTwnPopulated(data) {
  282 |         await test.step('Verify TWN auto-populated employer info', async () => {
  283 |             const inc = data.expectedIncome;
  284 | 
  285 |             // TWN response may take a moment — wait for checkbox to become checked, then scroll to it
> 286 |             await expect(this.salaryCheckbox).toBeChecked({ timeout: 30000 });
      |                                               ^ Error: expect(locator).toBeChecked() failed
  287 |             await this.salaryCheckbox.scrollIntoViewIfNeeded();
  288 | 
  289 |             // TWN populates a read-only card (not form inputs) — scroll then assert visible text
  290 |             if (inc?.companyName) {
  291 |                 const el = this.page.getByText(inc.companyName, { exact: false }).first();
  292 |                 await el.waitFor({ state: 'visible', timeout: 15000 });
  293 |                 await el.scrollIntoViewIfNeeded();
  294 |                 await expect(el).toBeVisible();
  295 |             }
  296 | 
  297 |             // Compensation: TWN renders the value as read-only text inside the
  298 |             // employer card (not as an <input> field) — the card is uneditable
  299 |             // because it is "verified through The Work Number and cannot be modified".
  300 |             // Strategy:
  301 |             //   • If a specific value is provided → assert that exact text is visible.
  302 |             //   • Otherwise → assert the "Annual Income" label rendered AND that a
  303 |             //     dollar-amount string ($N,NNN) appears anywhere on the page, which
  304 |             //     confirms TWN populated a figure without hard-coding the amount.
  305 |             if (inc?.totalAnnualCompensation) {
  306 |                 const el = this.page.getByText(inc.totalAnnualCompensation, { exact: false }).first();
  307 |                 await el.waitFor({ state: 'visible', timeout: 15000 });
  308 |                 await el.scrollIntoViewIfNeeded();
  309 |                 await expect(el).toBeVisible();
  310 |             } else {
  311 |                 // Verify the "Annual Income" label is present (section rendered)
  312 |                 const label = this.page.getByText(/Annual Income/i).first();
  313 |                 await expect(label).toBeVisible({ timeout: 15000 });
  314 |                 // Verify a dollar amount is visible next to the label
  315 |                 const amount = this.page.locator('text=/\\$[0-9,]+/').first();
  316 |                 await expect(amount).toBeVisible({ timeout: 5000 });
  317 |             }
  318 | 
  319 |             if (inc?.startDate) {
  320 |                 const el = this.page.getByText(inc.startDate, { exact: false }).first();
  321 |                 await el.waitFor({ state: 'visible', timeout: 15000 });
  322 |                 await el.scrollIntoViewIfNeeded();
  323 |                 await expect(el).toBeVisible();
  324 |             }
  325 |         });
  326 |     };
  327 | };
  328 | 
  329 | export default TWNPage;
```