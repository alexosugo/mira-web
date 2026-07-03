# Mira content pages — rewrite drafts

Proposed copy for every content page in `src/content/pages.ts`, following the editorial review of `feature/min-237-content-pages`. The register benchmark is `/features/product-answers` and `/use-cases/daily-drop-shops`.

**Global rules applied throughout:**

1. No "should" in customer-facing claims — every promise is present tense ("Mira never invents a price").
2. "You / your shop", never "the owner" (except inside an archetype's own story).
3. Scenarios show a real Mira reply with a KES price — never narration about what Mira "can" do.
4. Banned internal vocabulary: "The money shot", "Powers Mira adds", "the launch plan", "payment-system truth", "approved details", "beachhead".
5. Handoff message appears at most twice per page (scenarios + fitGuide), not five times.
6. Every page cross-links to its nearest neighbor via `secondaryLink` or FAQ.

Status legend: **REWRITE** (full redraft) · **EDITS** (targeted line changes) · **KEEP** (ship as is).

---

## Core funnel

### `/pricing` — EDITS

**What changed:** hero intro no longer describes the website's own structure; story section stops citing "the launch plan" and makes the pay-after-proof argument directly.

**Hero**
- H1 *(keep)*: Pricing for Instagram shops that sell in the DMs
- Intro: Start free. Move to Pro when your DMs are busy enough that missing them costs more than the plan. Elite is for shops that want a team around them.

**Sections**
- `pricingMatrix` *(keep)*

- `story` — kicker: How to think about price
  - Heading: Pay for saved sales, not software
  - Body: You shouldn't pay until Mira has shown you it's worth it. Start free and watch what it handles — the DMs answered, the buyers kept moving, the conversations handed to you with context. Free is for trying Mira on your own shop. Pro is for steady DM traffic. Elite is for shops that want onboarding, a dedicated contact, and custom help around how they sell.
  - Aside *(keep)*: A customer conversation is one shopper thread Mira helps with. It can include product questions, cart help, delivery questions, checkout guidance, and a handoff when the answer needs you.

- `faq`
  - Is there a free plan? — Yes. Free includes up to 10 customer conversations a month.
  - Do I need a card to start? — No. The Free plan does not ask for card details.
  - Can I upgrade later? — Yes. Start free and move to Pro when your DMs grow.
  - What happens when Mira needs me? — Mira hands the conversation back with context so you can step in.
  - Do you support M-Pesa checkout? — Yes. Mira sends customers an M-Pesa-ready checkout link in the DM.

---

### `/how-it-works` — REWRITE (re-voiced)

**What changed:** hero and story now talk to "you" instead of philosophizing about "a shop owner"; all "should" claims are now promises.

**Hero**
- H1 *(keep)*: How Mira starts selling in your Instagram DMs
- Intro: Connect your Instagram, review your catalog, test real DMs — and only then let Mira talk to customers. Careful setup is the point: Mira speaks for your shop.

**Sections**
- `numbered` — kicker: Setup · heading: The simple version *(items stay mapped from STEPS)*

- `story` — kicker: Concierge setup
  - Heading: You're not connecting a tool. You're trusting it with your customers.
  - Body: So setup is hands-on. We connect Instagram together, go through your catalog with you, fix prices before anything goes live, and run test conversations from your own recent posts. Mira only starts replying when the answers sound right to you.
  - Aside: Mira never invents a price. When your catalog is missing a detail, it asks you and hands over.

- `promiseGrid` — kicker: Owner control · heading: What happens before Mira speaks for your shop
  - Catalog review — Products, prices, sizes, and stock get checked before Mira replies to a single real customer.
  - Test mode — Send sample DMs and see exactly how Mira answers before customers do.
  - Clean handoff — Refunds, discounts, disputes, unusual delivery, and unclear products come back to you.
  - Weekly proof — Every week you see what Mira handled: DMs answered, handoffs sent, repeat questions covered.

- `prose` — kicker: Access · heading: DM scope · body *(keep)*: Mira reads only your shop's DMs, nothing else on your account.

- `faq`
  - How long does setup take? — Connecting an Instagram Business account takes less than two minutes. Catalog review takes longer, because accuracy matters.
  - Can I take over a conversation? — Yes. Step in whenever a DM needs your judgment.
  - What does Mira read? — Mira reads only your shop's DMs, nothing else on your account.

---

### `/instagram-dm-automation` — REWRITE (expanded)

**What changed:** this is the head-term SEO page and was two sections long. Built out to full weight: before/after, setup steps, a real DM demo, FAQ, and internal links.

**Hero**
- Kicker: Instagram DM automation
- H1: Instagram DM replies that help customers buy
- Intro: You open Instagram and the same questions are stacked up: price, size, delivery, is it available, can I pay now. Mira answers them from your shop's details — in seconds, around the clock.
- Secondary link: How Mira works → `/how-it-works`

**Sections**
- `beforeAfter` — heading: Before Mira, buyers wait for you. After Mira, they get answers while you work.
  - Before:
    - A shopper asks "how much?" under a fresh post. They're comparing options right now.
    - You reply when you can — between packing, posting, and everything else.
    - By the time you answer, the warm buyer is a silent thread.
    - Late-night DMs sit till morning.
  - After:
    - Mira replies in seconds with your prices, sizes, and stock.
    - Buyers get the next step — cart, delivery, checkout link — without waiting.
    - Anything tricky comes to you with context.
    - You wake up to orders, not a backlog.

- `numbered` — kicker: Setup · heading: Going live takes three steps *(items mapped from STEPS)*

- `promiseGrid` — heading: What Mira can answer in the DM
  - Product facts — Prices, stock, sizes, colors, and simple recommendations from your shop's details.
  - Buying next steps — Cart details, delivery basics, and an M-Pesa-ready checkout link.
  - A voice like yours — Short, helpful replies, with clear limits when Mira is unsure.
  - Handoffs — The unusual conversations come back to you with context, never a guessed answer.

- `scenarios` — heading: How it sounds in the DM
  - Customer: How much is this? Can it reach Rongai today?
    - Mira: It's KES 1,450, and yes — Rongai delivery is KES 250, same day if you order before 2pm. Want me to set up your order?
    - Owner note: If delivery to an area isn't on your page, Mira checks with you first.

- `story` — kicker: The honest promise
  - Heading: A customer is ready for minutes, not hours
  - Body: When a shopper asks "how much?" under a fresh post, they are usually comparing options right now. A slow reply turns a warm buyer into a silent thread. Mira keeps the first answer moving while you pack orders, eat dinner, or sleep.
  - Aside: The promise is speed and fewer missed DMs. What that does for your sales is something you'll see in your own weekly numbers, not something we claim upfront.

- `faq`
  - Is Mira a bot? — Mira is a shop assistant that answers from your details. When it's unsure, it hands the conversation to you instead of guessing.
  - Will it sound like my shop? — Mira learns from your posts and captions and keeps replies short and helpful. You can test it before customers ever see it.
  - What does it cost? — There's a free plan with up to 10 customer conversations a month. Pro starts from KES 3,500/mo. See `/pricing`.

---

### `/integrations/instagram` — EDITS

**What changed:** all safety claims are now flat promises ("never asks", not "should never ask"); the Q&A list is promoted to a real `faq` section (structured data); the internal channel note is rewritten for customers.

**Hero**
- Kicker: Instagram integration
- H1: Connect Mira to your Instagram shop
- Intro: Mira connects through Instagram's official Meta login for business accounts. It never asks for your password, and you can disconnect any time.

**Sections**
- `promiseGrid` — kicker: Before connection · heading: What your shop needs
  - Instagram Business account — Mira is built for shops that sell on Instagram, with DMs as a buying channel.
  - Catalog source — Product details Mira can learn from: your posts, captions, or a shop list you review.
  - Your permission — You approve the connection, and you can disconnect whenever you want.
  - Product review — Prices and stock get checked before Mira goes live.

- `story` — kicker: After connection
  - Heading: Mira works inside the way your customers already buy
  - Body: Customers still find you from posts, stories, and your profile. They still ask in DMs. Mira reads your shop's DMs, answers from your details, and brings you in when a conversation needs a human decision.
  - Aside: Instagram is where Mira works today. More channels come later — the DMs come first.

- `faq` *(promoted from list)*
  - Will Mira ask for my password? — No. Connection happens through Instagram's official Meta login. Nobody from Mira will ever ask for your password.
  - Can Mira read my personal messages? — No. Mira reads only your shop's DMs, nothing else on your account.
  - Can I switch it off? — Yes. Pause or disconnect Mira any time.
  - What if a product has no price? — Mira asks you instead of making one up.

---

## Features

### `/features/product-answers` — KEEP (two edits)

**What changed:** one overreaching claim softened (the site elsewhere refuses to claim revenue effects upfront); commented-out `//kicker` lines should be deleted from the source, not left commented.

- Before-list line 4: ~~Every late response loses you customers — they tell their friends, sales dip.~~
  → **Every late reply is a buyer who may not wait.**

Everything else ships as is — this page is the voice benchmark.

---

### `/features/orders-and-checkout` — REWRITE

**What changed:** hero de-listed; all three scenarios now show real Mira replies with prices; "payment-system truth" removed (both instances); before-list re-voiced from "the owner" to "you".

**Hero**
- Kicker: Orders and checkout
- H1: From "how much?" to a paid order — in one thread
- Intro: A buyer asks a question. Mira confirms the item, size, and quantity, keeps the whole order in one place, and sends an M-Pesa-ready checkout link when everything is clear. No scattered details, no lost sales in the follow-up.
- Secondary link: See what happens when Mira needs you → `/features/human-handoff`

**Sections**
- `beforeAfter` — heading: Before Mira, the order scatters across the thread. After Mira, everything is confirmed before payment.
  - Before:
    - A buyer asks one question. Then you're collecting item, size, quantity, delivery area, and payment timing — by hand, between packing orders.
    - They change the shade, add cookies, swap a scent. Now the order lives in five different messages.
    - You're juggling Instagram, M-Pesa, and riders. One missed detail and the wrong thing ships.
    - When the next step isn't clear, buyers go quiet.
  - After:
    - Mira confirms the item, size, and quantity as the buyer decides.
    - The whole order stays in one thread — changes included.
    - When the order is clear, the buyer gets an M-Pesa-ready checkout link.
    - Discounts, refunds, and special requests come to you, with the order details already collected.

- `numbered` — kicker: Buying flow · heading: The DM becomes an order thread
  1. Confirm the item — Mira checks product, size, color, and quantity before treating anyone as ready to buy.
  2. Keep the cart together — Every detail stays in one thread, so the buyer can see exactly what they picked.
  3. Send the checkout link — When the order is clear, the buyer gets an M-Pesa-ready link in the DM.
  4. Bring you in — Refunds, discounts, and special delivery are your decisions. Mira collects the details and hands over.

- `story` — heading: Most Instagram sales die in the messy middle
  - Body: The first question is easy. The order is where it breaks: you lose the thread, the buyer asks the same thing twice, the delivery area arrives after you've already quoted. Mira keeps the buying steps in order, so by the time money moves, everyone agrees on what's being bought.
  - Aside: Mira never confirms a payment. Only you — or M-Pesa itself — can say the money actually landed.

- `scenarios` — kicker: Checkout DMs · heading: How it sounds in the DM
  - Customer: I want the 50ml oud and the pocket spray. How do I pay?
    - Mira: Nice picks — the 50ml oud is KES 2,500 and the pocket spray is KES 800, both in stock. Delivery or pickup? Once I have your area, I'll send the checkout link.
    - Owner note: Discounts and substitutions come to you before Mira promises anything.
  - Customer: Can I order two banana breads for Saturday morning?
    - Mira: Two banana breads for Saturday — KES 900 total. Pickup in Westlands or delivery? Orders close Friday at 6pm, so you're right on time.
    - Owner note: Special baking slots and bulk pricing go to you first.
  - Customer: Can you deliver the body butter to Kilimani today?
    - Mira: The 200ml vanilla body butter is KES 800, and Kilimani delivery is KES 200 — usually same day if you order before 2pm. Want me to set it up?
    - Owner note: Same-day exceptions and rider timing stay your call.

- `faq`
  - Does payment happen inside Instagram? — The buyer pays through an M-Pesa-ready checkout link Mira sends in the DM.
  - Can Mira confirm size and quantity? — Yes. Every order detail is confirmed in the thread before checkout.
  - Can Mira confirm payment? — No. Only you, or M-Pesa itself, can confirm money landed. Mira never guesses about payment.
  - What if the buyer changes their order? — Mira updates the cart in the same thread, so the final order is the one that gets paid for.

---

### `/features/human-handoff` — REWRITE

**What changed:** scenarios now show the actual reply and the handoff move; new story section shows what a handoff looks like from your side (the missing product moment); "the launch plan" aside removed.

**Hero**
- Kicker: Human handoff
- H1: Mira hands tricky DMs back to you
- Intro: A good assistant knows when to stop. Mira answers the repeat questions, then brings you in when a reply needs judgment, permission, or care — with the whole story attached.
- Secondary link: What Mira answers on its own → `/features/product-answers`

**Sections**
- `beforeAfter` — heading: Before Mira, every tricky DM interrupts you cold. After Mira, handoffs arrive with context.
  - Before:
    - A DM says "can you do this today?" and you scroll up trying to work out what they wanted.
    - Complaints, refunds, and custom orders interrupt your day — even when the first three questions were easy ones.
    - A bot that guesses on sensitive questions makes your shop look careless.
    - A handoff with no context is just more work.
  - After:
    - Mira answers the repeat facts first, then hands over the moments that need you.
    - You see what the customer asked, what Mira answered, and why it stopped.
    - Skin claims, allergens, authenticity, refunds, complaints — always yours.
    - The customer never gets a made-up answer.

- `story` — kicker: From your side
  - Heading: What a handoff looks like
  - Body: You get the thread, not a mystery. Something like: "Sarah asked whether the hair oil helps with hairlines. I shared the ingredients and price, and told her you'd advise her properly — the thread is yours." You reply in one message instead of starting from zero.
  - Aside: Handoffs are built to be fast. A slow handoff can feel worse than no assistant at all.

- `promiseGrid` — kicker: When Mira stops · heading: Handoffs protect the shop relationship
  - Unclear product request — If your catalog can't identify what the shopper wants, Mira asks you.
  - Discounts — A discount changes the sale. Mira never promises one without you.
  - Refunds and complaints — Upset customers need a human, not a cheerful stock answer.
  - Risk-sensitive details — Allergens, skin reactions, authenticity, payment confirmation: owner territory.

- `scenarios` — kicker: Handoff examples · heading: How a good handoff sounds
  - Customer: Is this perfume original or tester stock?
    - Mira: It's the 50ml EDP at KES 3,200, sealed. On sourcing — let me bring in the owner so you can hear it from her directly.
    - Owner note: Fragrance trust is fragile. Source, batch, and authenticity claims are always yours.
  - Customer: My child has a nut allergy. Can they eat this?
    - Mira: The listed ingredients include almonds, so I wouldn't recommend it — but let me get the owner to advise you properly before you decide.
    - Owner note: Food safety gets your judgment, every time.
  - Customer: Can this oil grow my hairline back?
    - Mira: It's a castor and rosemary blend, KES 650 for 100ml. On what it can do for hairlines — the owner knows her products best. Let me bring her in.
    - Owner note: Treatment and results claims stay with you.

- `faq`
  - When does Mira hand over? — Whenever a conversation needs your judgment: discounts, refunds, complaints, safety questions, or anything your catalog can't answer.
  - What do I see? — The customer's question, what Mira already answered, and why it stopped — so you can reply in one message.
  - Does Mira guess when it's unsure? — No. Unsure becomes a handoff.

---

## Use cases

### `/use-cases/daily-drop-shops` — KEEP (one edit)

- Before-list line 4: ~~Your shop looks slow — because every reply is typed by hand.~~
  → **Your shop looks slow, even though you never stop typing.**

Everything else ships as is — this page (and Wanjiru) is the archetype benchmark.

---

### `/use-cases/fashion` — REWRITE

**Hero**
- Kicker: Fashion shops
- H1: DM help for fashion and thrift shops
- Intro: One good piece gets twenty DMs: size, price, is it still there. Mira answers them from your page before the buyer moves on — and checks with you when stock is moving fast.
- Secondary link: How orders come together → `/features/orders-and-checkout`

**Sections**
- `beforeAfter` — heading: Before Mira, one item creates twenty threads. After Mira, each buyer gets the right next step.
  - Before:
    - A dress drops and the comments and DMs land at the same time: size, color, price, pickup, still available.
    - You switch between selling, packing, editing posts, and apologizing for late replies.
    - A one-off piece sells — and the DMs keep asking for it, thread after thread.
    - The buyer who wanted it most is the one who couldn't wait.
  - After:
    - Mira answers size, color, price, and delivery from your page in seconds.
    - Sold or uncertain? Mira points to alternatives you have — or checks with you.
    - Ready buyers get a cart: piece, size, delivery area, checkout link.
    - You keep the calls that matter: styling, bargaining, and stock you haven't confirmed.

- `archetype` — Achieng · Curated thrift seller in Nairobi. Posts new pieces three times a week, sells mostly from stories.
  - Her day:
    - Posts a story. Ten people ask the waist size of the same pair of jeans.
    - Fast buyers want delivery to CBD, Westlands, or Kasarani — today.
    - A piece sells while ten more shoppers are still asking about it.
    - One wrong "yes, it's available" costs her more than a slow reply.
  - How Mira helps:
    - Answers size, measurements, color, price, and delivery from her page.
    - Suggests similar available pieces when the one they want is gone.
    - Never promises stock it hasn't confirmed — it asks her first.
    - Builds the cart when the buyer says yes.

- `promiseGrid` — heading: What Mira handles for a fashion page
  - Size checks — "Do you have medium?" and "will this fit a size 10?" — answered from your measurements.
  - Fast stock — When stock is uncertain, Mira checks with you instead of promising.
  - Condition and color — Thrift or new, true-to-photo notes, fabric and care — from what you've written.
  - Checkout — Piece, size, quantity, and delivery kept together in one thread.

- `scenarios` — heading: How it sounds in the DM
  - Customer: Is this UK 8 or small? Can you send waist measurements?
    - Mira: It's a UK 8 — waist 30cm flat, length 102cm. KES 1,200, and it's still available. Want delivery or CBD pickup?
    - Owner note: Fit advice and try-on judgment go to you. Mira sticks to the measurements.
  - Customer: Is the black pair still available for CBD pickup?
    - Mira: Let me check with the owner — these are moving fast and I'd rather confirm than promise. Meanwhile: they're KES 2,000, sizes 39–41.
    - Owner note: One-off pieces get confirmed with you before Mira says "it's yours."
  - Customer: Is the denim jacket thrifted or new, and is the color true to the photo?
    - Mira: It's curated thrift, excellent condition — photographed in daylight, so the color is close. KES 1,500. Want more photos before you decide?
    - Owner note: Condition disputes and extra videos stay with you.

- `fitGuide` — kicker: Good fit · heading: Fashion sellers need speed and restraint at the same time
  - Body: Your page already has demand. The job is to stop losing interested buyers to slow replies — without ever promising a piece you can't deliver.
  - Works best: Curated thrift, shoes, bags, and outfit pages with repeat questions about size, measurements, condition, pickup, and delivery.
  - Handed to you: Styling judgment, bargaining, damaged-item concerns, custom sourcing, and any stock you haven't confirmed.
  - You get: Buyer-ready threads with piece, size, measurements, and delivery sorted — and the judgment calls flagged for you.

- `faq`
  - Can Mira answer size questions? — Yes, from the sizes and measurements on your page.
  - What about sold-out pieces? — Mira suggests available alternatives or checks with you. It never promises stock it can't see.
  - Can Mira give styling advice? — Simple suggestions from your catalog, yes. Personal styling stays with you.

---

### `/use-cases/beauty` — REWRITE

**Hero**
- Kicker: Beauty shops
- H1: DM help for beauty shops selling on Instagram
- Intro: Shades, bundles, sealed stock, delivery today — the questions never stop. Mira answers them from your page and leaves the skin advice to you.
- Secondary link: How handoffs work → `/features/human-handoff`

**Sections**
- `beforeAfter` — heading: Before Mira, every shade question waits for you. After Mira, product facts move first.
  - Before:
    - Which shade is in stock, what's in the bundle, can it come today — again and again.
    - You repeat the same price and stock answers while being careful not to promise results.
    - A buyer who needed one quick confirmation disappears before you reply.
    - Small orders pile up and checkout details scatter across threads.
  - After:
    - Mira answers shade, stock, bundle, price, and delivery from your page.
    - Recommendations stick to product facts — never skin promises.
    - Ready buyers get a tidy cart and an M-Pesa-ready checkout link.
    - Skin concerns and complaints come to you, with the thread attached.

- `archetype` — Njeri · Beauty seller in Nairobi. Runs product drops from Instagram, closes orders in the DMs.
  - Her day:
    - Posts a restock. "Do you have 330?" arrives thirty times.
    - Buyers want a quick bundle suggestion before they pay.
    - She's careful never to promise what a product can't do.
    - Small orders stack up faster than she can keep the details straight.
  - How Mira helps:
    - Answers shade, stock, price, and bundle questions the moment they land.
    - Suggests from her products without promising results.
    - Hands skin concerns and complaints to her with the full thread.
    - Sends ready buyers the checkout link.

- `promiseGrid` — heading: What Mira handles for a beauty page
  - Shade and stock — "Do you have 330, sealed?" — answered from your stock details.
  - Bundles — What's in the set, what it costs, what can be swapped — by your rules.
  - Cleaner checkout — Product, quantity, and delivery kept together before payment.
  - Skin questions — Acne, reactions, dark spots, pregnancy — always handed to you.

- `scenarios` — heading: How it sounds in the DM
  - Customer: Do you have Fit Me 330, and is it sealed?
    - Mira: Yes — Fit Me 330 is in stock, sealed, KES 1,350. Want delivery or pickup? I can send the checkout link.
    - Owner note: If shade or packaging details are missing from your page, Mira checks with you.
  - Customer: Can I swap the toner in the bundle for sunscreen?
    - Mira: The glow bundle allows one swap — toner for sunscreen works, same price at KES 2,800. Should I set that up?
    - Owner note: Swaps only happen by rules you've set. Anything that changes your margin comes to you.
  - Customer: I have oily skin and dark spots. Which one should I use?
    - Mira: I can tell you the facts — the gel moisturizer is oil-free and light, KES 900. For your skin specifically, let me bring in the owner to advise you properly.
    - Owner note: Skin concerns and results questions get human care, every time.

- `fitGuide` — kicker: Good fit · heading: Beauty DMs are high-volume and trust-sensitive
  - Body: Mira is useful when your product facts are clear and you want faster replies without an assistant making claims you wouldn't make yourself.
  - Works best: Beauty shops with clear shade, stock, sealed-packaging, bundle, and delivery details that customers ask about every day.
  - Handed to you: Skin reactions, acne, dark spots, pregnancy, complaints, custom bundles, and anything that sounds medical or guaranteed.
  - You get: Faster routine answers, and the sensitive questions arriving with context instead of guesswork.

- `faq`
  - Can Mira answer shade and stock questions? — Yes, from the details on your page.
  - Can Mira recommend products? — It suggests from your catalog facts. It never makes medical or guaranteed-result claims.
  - What about sensitive questions? — They come to you with the whole conversation attached.

---

### `/use-cases/accessories` — REWRITE

**Hero**
- Kicker: Accessories shops
- H1: DM help for accessories shops
- Intro: Bags, jewelry, watches, phone cases — detail-heavy products bring detail-heavy questions. Mira answers the facts fast and keeps the taste, bundles, and custom calls with you.
- Secondary link: How orders come together → `/features/orders-and-checkout`

**Sections**
- `beforeAfter` — heading: Before Mira, small questions slow every sale. After Mira, buyers get product clarity fast.
  - Before:
    - Price, color, material, dimensions, does it fit an iPhone 15 — over and over.
    - You answer from captions, screenshots, and memory while stock keeps changing.
    - Gift buyers comparing three shops buy from whoever sounds surest, soonest.
    - Custom requests interrupt you even when the first question was simple.
  - After:
    - Mira answers price, color, material, dimensions, and compatibility from your details.
    - Gift orders arrive organized: items, budget, date, delivery — collected before you step in.
    - Buyers who know what they want go straight to checkout.
    - Custom work, discounts, and uncertain fits come to you.

- `archetype` — Linet · Accessories seller in Nairobi. Posts bags and jewelry drops, closes orders in the DMs.
  - Her day:
    - "How much is the bag? Is the necklace stainless? Does this case fit a 15 Pro Max?"
    - Gift buyers need packaging, timing, and bundle answers before they pay.
    - One wrong compatibility answer means a return and an unhappy buyer.
    - She wants speed — without Mira promising custom work it can't check.
  - How Mira helps:
    - Answers the product facts and delivery basics instantly.
    - Collects gift orders — items, budget, card message, date — before she steps in.
    - Only answers model-fit when her page lists the supported models.
    - Shows her which repeat questions it took off her day.

- `promiseGrid` — heading: What Mira handles for an accessories page
  - Product details — Price, color, material, dimensions, stock — ready when buyers ask.
  - Compatibility, carefully — Phone-model fit answered only when your page lists the models. Otherwise it asks you.
  - Gift buyers — Timing, packaging notes, and bundle basics handled before you step in.
  - Custom work — Special orders and bundle pricing come to you with the details collected.

- `scenarios` — heading: How it sounds in the DM
  - Customer: Is the gold necklace stainless steel or does it tarnish?
    - Mira: It's 316 stainless steel — doesn't tarnish with normal wear. KES 850, in stock. Want it delivered or picked up?
    - Owner note: Material and hypoallergenic claims only come from what you've listed.
  - Customer: Does this MagSafe case fit iPhone 15 Pro Max?
    - Mira: Yes — this one is listed for the 15 Pro Max. KES 1,600, black and clear in stock. Which color?
    - Owner note: If a model isn't on your list, Mira asks you — a wrong fit answer costs a return.
  - Customer: Can you pack the bag, earrings, and sunglasses as a birthday gift?
    - Mira: Lovely combo — that's KES 4,300 together. When do you need it, and where's it going? I'll pass the wrapping request to the owner with everything ready.
    - Owner note: Gift packaging promises and bundle pricing stay yours.

- `fitGuide` — kicker: Good fit · heading: Accessories shops win on details
  - Body: Buyers want material, size, fit, and packaging answers before they trust a page. One wrong compatibility answer costs a return — so Mira answers what your page supports and asks you about the rest.
  - Works best: Bag, jewelry, watch, sunglasses, phone-case, and gifting pages with material notes, dimensions, model lists, colors, and delivery rules written up.
  - Handed to you: Custom work, repairs, unclear compatibility, gift packaging promises, discounts, and unlisted material claims.
  - You get: Cleaner bundle requests and far fewer repeat checks on price, material, fit, and delivery.

- `faq`
  - Can Mira answer jewelry and bag questions? — Yes: price, color, material, dimensions, stock, and delivery — from your page.
  - Can Mira answer phone-case compatibility? — Only when your page lists the supported models. Uncertain fits come to you.
  - Can Mira handle gift bundles? — It collects the items and delivery details, then hands the pricing and packaging to you.

---

### `/use-cases/fragrances` — REWRITE

**Hero**
- Kicker: Fragrance shops
- H1: Every scent question, answered in seconds
- Intro: You post a new scent and the same messages arrive: how much, is it sweet, does it last, is it original. Mira answers the facts from your page the moment buyers ask — and sends the trust questions straight to you.
- Secondary link: How handoffs work → `/features/human-handoff`

**Sections**
- `beforeAfter` — heading: Before Mira, buyers wait to hear if it's sweet or strong. After Mira, they get the notes, the price, and the next step.
  - Before:
    - Every post brings the same questions: sweet or woody, how strong, is it unisex, how much for the small size.
    - You type out the prices for the oil, the decant, and the full bottle — again — while packing yesterday's orders.
    - "Is this original?" lands in the middle of your day, and it deserves a careful answer.
    - A buyer comparing three perfume pages buys from whoever replies first.
  - After:
    - Mira answers notes, sizes, prices, and stock from your page in seconds.
    - Gift buyers get help choosing within budget, and you get the details when they want a wrapped set.
    - Authenticity, tester, and sourcing questions come straight to you. Mira never improvises trust.
    - Ready buyers get a clear cart — scent, size, quantity, delivery — and a checkout link.

- `archetype` — Amina · Perfume seller in Nairobi. Posts scent drops, closes every order in the DMs.
  - Her day:
    - Posts a new oud. The "how much" messages start before she puts the phone down.
    - Explains for the tenth time that the vanilla musk comes in 3ml, 6ml, and 30ml.
    - A buyer asks if a designer bottle is original. She stops everything — that one she answers herself.
    - Gift buyers want advice, and advice takes time she doesn't have.
  - How Mira helps:
    - Answers notes, sizes, prices, and stock the moment buyers ask.
    - Collects budget, occasion, and preference from gift buyers before Amina steps in.
    - Sends authenticity and sourcing questions straight to her, untouched.
    - Builds the cart once the buyer picks a scent and size.

- `promiseGrid` — heading: What Mira handles for a perfume page
  - Scent notes — "Is it sweet? Is it strong?" — answered from the notes you've written up.
  - Every size, every price — Oils, decants, sprays, full bottles, gift sets. Each one quoted right.
  - Gift buyers — Budget, occasion, and packaging collected, so you step in with everything you need.
  - Trust stays yours — Original, tester, batch, and sourcing questions always come to you.

- `scenarios` — heading: How it sounds in the DM
  - Customer: Do you have something fresh for office wear, not too loud?
    - Mira: The citrus vetiver is the most office-safe on the page — clean and fresh, not sweet. KES 1,500 for 30ml, or KES 350 for a 3ml try-size. Want one in your cart?
    - Owner note: When a buyer wants a personal recommendation, Mira hands the thread to you.
  - Customer: How much is the 10ml decant, the 6ml vanilla musk oil, and the Lattafa gift box?
    - Mira: The 10ml decant is KES 700, the vanilla musk oil is KES 450, and the Lattafa gift box is KES 3,200 — all in stock. Delivery or pickup?
    - Owner note: If a price or size is missing from your page, Mira asks you before quoting anything.
  - Customer: Is this designer bottle original, tester, or inspired?
    - Mira: Everything on this page is sealed retail stock — and for this bottle, let me bring in the owner so you can hear it from her directly.
    - Owner note: Mira only repeats the sourcing language you wrote. Anything beyond it comes to you.

- `fitGuide` — kicker: Good fit · heading: Made for perfume pages where trust is the product
  - Body: Fragrance buyers ask two kinds of questions: facts (notes, size, price, stock) and trust (original, tester, source). Mira takes the facts off your plate and treats every trust question as yours.
  - Works best: Perfume pages selling designer, niche, Arabian, oils, decants, and gift sets, with notes and prices written up on the page.
  - Handed to you: Authenticity, tester, batch, sourcing, longevity claims, and personal scent matching.
  - You get: Buyer-ready threads with budget, occasion, and size sorted — and the trust question waiting for your answer, untouched.

- `faq`
  - Can Mira answer scent note questions? — Yes, from the notes and details on your page.
  - Can Mira help gift buyers? — It collects budget, occasion, and preference, then suggests from your products or brings you in.
  - Can Mira answer "is it original?" — Only with the exact sourcing language you've written. Anything more comes to you.

---

### `/use-cases/home-bakeries-food-brands` — REWRITE

**Hero**
- Kicker: Home bakeries and food brands
- H1: DM help for home bakeries and food brands
- Intro: What's available today, does it have nuts, can it reach Kilimani by four. Mira answers your menu questions while you bake — and never improvises on food safety.
- Secondary link: What Mira answers on its own → `/features/product-answers`

**Sections**
- `beforeAfter` — heading: Before Mira, every order needs manual follow-up. After Mira, buyers get menu and delivery clarity.
  - Before:
    - What's available today, which flavors are left, when's the cutoff, can I pick up — while your hands are in dough.
    - You repeat prices, sizes, allergens, and delivery days between the oven and the packing table.
    - Allergy questions deserve careful answers, and careful takes time.
    - Custom cakes and office orders interrupt, even when the first question was simple.
  - After:
    - Mira answers your menu, prices, flavors, allergens, and cutoffs from what you've set.
    - Orders arrive clear: item, quantity, date, delivery area, checkout link.
    - Allergen gaps, custom cakes, and bulk orders come to you — never guessed.
    - You spend the saved time making the food.

- `archetype` — Muthoni · Home bakery and pantry brand in Nairobi. Posts weekly menus, takes orders in the DMs.
  - Her day:
    - Posts the weekend menu. The "what's left?" messages start immediately.
    - Answers delivery and M-Pesa questions while three things are in the oven.
    - A nut-allergy question stops everything — that answer has to be right.
    - Saturday slots fill up and she loses track of who confirmed what.
  - How Mira helps:
    - Answers menu, prices, batch availability, and delivery windows instantly.
    - Collects quantity, date, flavor, and delivery area before she steps in.
    - Only shares allergen notes she's written — gaps come to her.
    - Keeps weekend orders in tidy threads instead of scattered promises.

- `promiseGrid` — heading: What Mira handles for a food page
  - Menu memory — Today's items, flavors, portions, batch limits, and prices — ready when buyers ask.
  - Allergen caution — Nuts, dairy, gluten, eggs — answered only from your notes, or handed to you.
  - Order cutoffs — Delivery windows, weekend slots, and preorder rules — as you've set them.
  - Custom orders — Birthday cakes, grazing boxes, and office orders come to you with details collected.

- `scenarios` — heading: How it sounds in the DM
  - Customer: Do you have banana bread or brownies today, and can I get them before 4?
    - Mira: Both — banana bread is KES 450, brownies KES 600 a box. Orders before 1pm make the 4pm delivery. Want one of each?
    - Owner note: If a batch is nearly sold out or timing changed, Mira checks with you before confirming.
  - Customer: Can I order a Bento cake and cupcakes for Saturday in Kilimani?
    - Mira: Yes — Saturday still has slots. Bento cakes are KES 1,800, cupcakes KES 1,200 for six. What flavors, and what should the cake say? I'll pass the details to the baker to confirm your slot.
    - Owner note: Custom designs, deposits, and weekend slots get your final confirmation.
  - Customer: Does the chilli oil need a fridge, and how long does it last?
    - Mira: It keeps for a month in a cool cupboard, three in the fridge — that's from the maker's own notes. KES 700 a jar, two left from this batch.
    - Owner note: Storage and shelf-life answers only come from notes you've written.

- `fitGuide` — kicker: Good fit · heading: Food brands need speed with food-safety restraint
  - Body: Food DMs repeat all day, but the sensitive ones can't be improvised. Mira helps when your menu, prices, and ingredient notes are written up — and every safety gap comes straight to you.
  - Works best: Home bakeries, snack brands, and weekly-menu kitchens with clear prices, flavors, batch limits, cutoffs, and ingredient notes.
  - Handed to you: Custom cakes, office orders, allergy-sensitive requests, late orders, refunds, deposits, and any storage or dietary question you haven't written up.
  - You get: Clear orders — item, quantity, date, area — and the food-safety questions flagged for your careful answer.

- `faq`
  - Can Mira answer menu and price questions? — Yes, from the menu and prices you've set.
  - Can Mira answer allergen questions? — Only from your own ingredient notes. Anything missing comes to you.
  - Can Mira take custom cake or bulk orders? — It collects the details, then hands the order to you to confirm.

*(Note: the old granola/nuts scenario duplicated one on `/features/product-answers` almost verbatim — replaced with a shelf-life scenario.)*

---

### `/use-cases/skincare-haircare-makers` — REWRITE

**Hero**
- Kicker: Skincare and haircare makers
- H1: DM help for skincare and haircare makers
- Intro: Is it greasy, what's in it, which size is left — your DMs fill with the same questions between batches. Mira answers the product facts and leaves every results claim to you.
- Secondary link: How handoffs work → `/features/human-handoff`

**Sections**
- `beforeAfter` — heading: Before Mira, every ingredient question pulls you away. After Mira, your product facts answer first.
  - Before:
    - Is the body butter greasy, what scent, which jar size, how do I use it — on repeat.
    - You retype ingredients, prices, and refill notes while a batch waits.
    - Acne, eczema, and hair-growth questions need care you can't give mid-pour.
    - Wholesale and salon requests interrupt with ten questions each.
  - After:
    - Mira answers ingredients, sizes, scents, prices, and stock from your page.
    - Results and skin-concern questions come to you — never improvised.
    - Wholesale and refill requests arrive with quantities and deadlines collected.
    - You keep full control of every claim your brand makes.

- `archetype` — Terry · Small-batch skincare and haircare maker in Nairobi. Sells through Instagram drops.
  - Her day:
    - Posts a body butter batch. The scent and size questions start before it cools.
    - Retypes the ingredients list for the fifth time today.
    - Someone asks if the oil regrows hairlines. That answer has to be hers.
    - A salon wants unscented refills — quantities, sizes, deadline, all in one thread.
  - How Mira helps:
    - Answers ingredients, sizes, scents, prices, and what's in stock.
    - Hands every results, reaction, and pregnancy question to her.
    - Collects wholesale and salon orders before she steps in.
    - Tells buyers when the next batch lands — when she's set it.

- `promiseGrid` — heading: What Mira handles for a maker's page
  - Ingredient memory — Full ingredients, scents, textures, sizes, and refill options — from your listings.
  - Claim control — Acne, eczema, hair growth, pregnancy, reactions — always handed to you.
  - Batch clarity — In stock, made to order, or next batch Friday — as you've set it.
  - Bulk requests — Wholesale, salon, and custom-scent asks arrive with the details collected.

- `scenarios` — heading: How it sounds in the DM
  - Customer: Do you have vanilla body butter in 250g, or only 100g?
    - Mira: Both — 250g is KES 950, 100g is KES 450. The 250g is from Tuesday's batch, four jars left. Delivery or pickup?
    - Owner note: If a batch is sold out or waiting on jars, Mira checks with you before promising.
  - Customer: Can this black soap clear acne or eczema?
    - Mira: It's raw black soap with shea and neem — gentle enough for daily use, KES 350. For acne or eczema specifically, let me bring in the maker to advise you properly.
    - Owner note: Skin results, reactions, and sensitive usage questions stay with you.
  - Customer: Can I get unscented jars and hair oil refills for my salon?
    - Mira: We can do that — how many jars, which sizes, and when do you need them? I'll pass it to the maker with your details for pricing.
    - Owner note: Wholesale pricing and custom scents are your call.

- `fitGuide` — kicker: Good fit · heading: Makers need Mira to be careful, not loud
  - Body: Small-batch brands win trust through detail, consistency, and honest boundaries. Mira answers the facts you've written and treats every claim as yours to make.
  - Works best: Makers selling body butter, black soap, hair oils, scrubs, lip balm, and refills, with ingredients, sizes, and batch notes written up.
  - Handed to you: Acne, eczema, hair growth, pregnancy, reactions, custom scents, wholesale pricing, and any result claim you haven't written.
  - You get: Fewer repeat product-fact DMs — and the sensitive questions packaged for a careful human reply.

- `faq`
  - Can Mira answer ingredient and size questions? — Yes, from the ingredients, sizes, and prices on your page.
  - Can Mira answer skin or hair result questions? — No. Those always come to you.
  - Can Mira handle wholesale or salon requests? — It collects the details, then hands the request to you.

---

## Trust & legal

### `/security` — EDITS

**What changed:** every promise de-hedged. This is the page that gets quoted back at you — no "should" survives.

**Hero**
- Kicker: Security
- H1: Security at Mira
- Intro: Handing your DMs to software is a big ask. This page says plainly what Mira connects to, what it reads, and how you stay in control.

**Sections**
- `promiseGrid` — heading: Plain-language security promises
  - No Instagram password — Mira connects through Instagram's official Meta login. It never asks for your password — and neither will anyone from Mira.
  - Shop DMs only — Mira reads only your shop's DMs, nothing else on your account.
  - You're in control — Step in, pause, or disconnect Mira whenever you want.
  - No guessed answers — When product details are missing or uncertain, Mira hands the conversation to you instead of making something up.

- `legal` — heading: Report a concern
  - Email hello@withmira.co with any security question, account concern, or suspicious activity.
  - Never send passwords or payment details by email. Mira will never ask for your Instagram password.

---

### `/privacy` — EDITS

**What changed:** two hedges fixed. Everything else keeps — the plain-language approach is a differentiator, and "These terms stay plain because trust is the product" stays.

- Third parties section: ~~These providers are used to operate Mira. They should only receive information needed for their role.~~
  → **These providers are used to operate Mira. They only receive the information needed for their role.**
- How Mira uses information: ~~Mira should not be used to collect sensitive customer information…~~
  → **Mira must not be used to collect sensitive customer information that is not needed to answer the shop conversation.** *(obligation on the user — "must" is correct here)*

---

### `/terms` — EDITS

- Hero intro: ~~…where Mira should hand conversations back instead of guessing.~~
  → **…where Mira hands conversations back instead of guessing.**
- Plans section: ~~Mira should give reasonable notice where practical.~~
  → **Mira will give reasonable notice where practical.**

Everything else keeps.

---

### `/data-deletion` — EDITS

**What changed:** the hero was talking to Meta's app reviewer in front of customers.

- Intro: ~~You can ask Mira to delete shop data connected to your account. The request path is intentionally simple because this page may be used for Instagram app review and customer trust checks.~~
  → **You can ask Mira to delete the shop data connected to your account. Here is exactly what to send and what happens next.**

Sections keep as is.

---

## Company

### `/about` — EDITS

**What changed:** "beachhead" (internal GTM jargon) removed; story re-voiced to "you"; one human closing line added.

- `story` — heading: Built for the DM-first shop owner
  - Body: Mira starts with a narrow customer: Kenyan Instagram shops where you — or a tiny team — personally answer product questions, stock checks, and delivery requests. That focus keeps the product grounded in the selling day you already have.
  - Aside: ~~The beachhead is Nairobi fashion, beauty, accessories, and related Instagram shops with steady DM volume.~~
    → **Mira starts with Nairobi fashion, beauty, accessories, and fragrance shops — the sellers who live in their DMs.**

- `promiseGrid` *(keep, one hedge fixed)*: "Speed without recklessness" body → **Reply quickly, but hand over instead of guessing when the answer is uncertain.** *(unchanged — already clean)*

- NEW closing `prose`: **Mira is built in Nairobi, by people who've watched sellers answer DMs at midnight.**

---

### `/contact` — KEEP

No changes.

---

### `/help` — EDITS

- FAQ: ~~What if Mira does not know an answer? — Mira should hand over to the shop owner instead of guessing.~~
  → **What if Mira does not know an answer? — Mira hands the conversation to you instead of guessing.**

Everything else keeps.

---

## Follow-up engineering tasks

1. Delete the commented-out `//kicker:` lines in `pages.ts` (product-answers, orders-and-checkout, human-handoff, daily-drop-shops).
2. Extend `src/test/content-voice.test.ts` to fail on: `should` in claim sentences, `the owner` outside archetype blocks, `The money shot`, `Powers Mira adds`, `approved` density, `launch plan`, `payment-system truth`.
3. Add `secondaryLink` cross-links as specified per page above.
4. `/integrations/instagram`: converting the Q&A list to a `faq` section also gets it FAQ structured data via `structured-data.ts`.
