- 1. What Mira currently does
  - What kinds of customer questions can Mira answer?
    + No medical or legal or financial, etc questions
    + Questions based on the products that a shop has in stock
    + Mira can answer questions about:
      ++ how much products cost
      ++ whether a shop has a specific product in stock
      ++ what payment and delivery options a shop offers
      ++ product details
      ++ payment details
      ++ product comparisons
      ++ product recommendations
      ++ order and delivery handling
      ++ shop details such as location

  - Can it answer questions about price, stock, sizes, colours, ingredients, delivery and pickup?
    + yes

  - Can it recommend products?
    + yes

  - Can it compare products?
    + yes

  - Can it build a cart or order?
    + yes

  - Can it collect delivery details?
    + yes

  - Can it send payment instructions or payment links?
    + yes

  - Can it confirm payment?
    + no

  - Can it follow up with a customer?
    + what does this mean? it's too vague.

  - Can it respond to story replies, comments or only direct messages?
    + yes

- 2. Where Mira gets shop information
  - Does Mira read Instagram posts and captions?
    + yes, Mira ingests a shop's IG posts and converts them to products by extracting product information from the post content and imagery
    + Mira answers all questions in DMs based on the information the shop entered during onboarding (delivery and payment details) as well as product and shop information gathered from the shops's posts

  - Can the owner enter products manually?
    + yes, the shop owner can 

  - Can products be imported?
    + Mira only ingests a shop's IG posts and converts them to products by extracting product information from the post content and imagery

  - How are prices, stock and variants updated?
    + Mira updates product information when a shop updates a post

  - What happens when information conflicts or is missing?
    + Mira asks the shop owner to fill in missing price information

  - Can the owner correct an answer or update Mira’s knowledge?
    + Mira only ingests a shop's IG posts and converts them to products by extracting product information from the post content and imagery
    + This allows Mira to update product information in its shop knowledge base when an IG page adds a new post or updates an existing post
    + Mira answers all questions in DMs based on the information the shop entered during onboarding (delivery and payment details) as well as product and shop information gathered from the shops's posts

- 3. Human handover
  - What causes Mira to stop and ask the owner?
    + When the user intent is not immediately clear and Mira cannot answer confidently based on the accumulated shop knowledge base

  - How is the owner notified?
    + The owner is notified on a channel they select during onboarding: one of IG, WhatsApp, Email

  - Where does the owner take over?
    + Two options:
      ++ inside the IG DM: the owner clicks on notification link contained in the DM to open the DM
      ++ from the dashboard: a shop owner can click the "Take Over" CTA on a conversation to send and receive responses within the DM

  - Does Mira summarise the conversation?
    + Yes, in the dasbohard
    + Product Feature Idea: Mira could also add a summary to the DM

  - Can the owner pause Mira for one conversation or for the whole account?
    + the owner can allow or disallow Mira from processing messages by turning the bot on or off
    + Currently, the owner cannot pause Mira for only one message

  - Can Mira resume after the owner replies?
    + yes, the owner can use the "Hand back" CTA within a DM in the dashboard to hand the conversation back to Mira

- 4. Setup experience
  - What does the customer click?
    + The customer starts by clicking any of the "Get started" CTA on the website

  - What account do they create?
    + They create a Mira shop account by connecting their shop IG page

  - When do they connect Instagram?
    + It's the first thing they do in the onboarding process

  - What Instagram account type is required?
    + Professional

  - What information must they provide?
    + After connecting their shop IG page, they need to:
      ++ Select Handoff notifications channel: IG, WhatsApp, Email
      ++ Provide payment options details: Select and enter details
      ++ Provide delivery options details: Select and enter details
      ++ (optional) what their biggest pain point is
      ++ Connect IG handoff account if they chose IG as handoff destination: send a message to Mira from that IG account containing a code we share

  - Can they test Mira before it replies publicly?
    + yes, shop accounts start in test mode
    + in shop mode, only a designated IG account can message the shop: all other messages are dropped

  - How do they turn Mira on?
    + By clicking the "Turn bot on" CTA in the dashboard

  - How long does a normal setup take?
    + 10mins

  - What commonly goes wrong?
    + Users get discouraged by the test account setup

  A short screen recording of the complete signup, setup, testing and handover flow would be extremely useful.

- 5. Pricing and limits
  - Current plans and prices
    + KES 0: free tier (manages conversations for at most 10 customer threads per month, with Mira branding)
    + KES 3500: Pro tier (all conversations are processed)
    + Unpriced: Elite tier (chat with us for a custom product)

  - Trial or free-plan rules
    + Mira manages conversations for at most 10 customer threads per month, with Mira branding

  - What counts as a conversation
    + an ongoing message thread with a unique IG account
  
  - Monthly limits
    + Unlimited message threads on Pro
    + 10 message threads on Free

  - What happens when a limit is reached
    + When a limit is reached, Mira stops processing messages for that shop
    + Mira still processes new shop posts and updates

  - Whether checkout requires a card or another payment method
    + Not on free tier
    + Mpesa is used for the Pro tier

  - Upgrade, downgrade and cancellation behaviour
    - Upgrade: previous limits are discarded, new limits are instated
    - Cancellation results in both message and post processing to stop

  - Countries and currencies currently supported
    - Kenya / KES

- 6. Current boundaries
  - Unsupported Instagram account types: only Professional IG accounts are supported
  - Unsupported countries or languages: Only Kenya is targeted for the test launch, interest from other locations will lead to expansion
  - No payment confirmation: Mira doesn't handle payment confirmation, it only receives the MoMo payment confirmation message and marks the order as payment pending confirmation. the shop owner can then go and confirm the payment
  - No medical, legal, financial, etc or product-safety advice
  - No WhatsApp support

- 7. Real examples and proof
  - Do you have shops actively using Mira: not yet
  - Can any be named publicly: not yet
  - Can we use anonymised real conversations: yes
  - Are there measured results yet: no
  - Are there customer quotes: no
  - Do you have product screenshots or recordings we can use: yes
  - Which existing examples on the site are fictional or illustrative: all of them are illustrative