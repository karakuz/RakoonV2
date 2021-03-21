CS 476/576 Project: E-commerce System

The goal of this project is to design & implement an e-commerce website. Students are expected to fulfil
the following requirements of the customer:
  ● Adding an item to the shopping cart should be available without account creation.
  ● Users must have the ability to enable 2-factor authentication.
  ● Users can change their passwords & information, see their previous orders & invoices.
  ● Users can add, delete and edit products to, from and in their basket.
  ● Users can checkout (buy) the items in their basket & receive a pdf invoice.
  ● Users can buy the products through a full-fledged payment system.

○ In order to cope with the modern technologies, the payment system must be
crypto-currency based. For this project, you can connect to the test networks of popular
crypto systems(Ethereum Chain, Binance Smart Chain, Algorand, Avalanche, Polkadot
etc. etc.)

○ Create your own crypto-currency from one these networks so that you can control the
whole pool of the currency and keep the price fixed.

○ When a user is created, you also need to create a public address for them so that the
payments can be sent from their account to the account of the user who listed the
product(Product Manager)

○ Since this is a school project, for money deposits, you just need to create a fund page,
where a logged in user can go to the site, enter how many YOUR_TOKEN they want to
have and click accept.( Similar Example )

○ We suggest setting the price of your currency to be 1 TL = 1 YOUR_TOKEN so that
your operations will be more user friendly.
  ● Users can search products with different parameters like name, description etc. (advanced
  search component usage is strongly recommended e.g. apache solr, elasticsearch)
  ● Users can filter search results by parameters & sort them in ascending/descending order
  according to the attributes like price (can also be an interval), name, rating etc.
  ● A mailing system is required for sign-up, checkout, order status change and related
  functionalities.
  ● Users can be notified about the new campaigns, their order tracking etc. via push
  notifications.
  ● Users can comment on the products and rate the purchased items.
  ● Other than the customer role, the following roles exist:
  
○ Sales Manager:
  ■ can see the invoices.
  ■ is responsible for changing the status of the orders.
  ■ can develop and deploy campaigns.
  ■ can analyze the sales through charts.
  ■ can cancel a purchase order or redirect to another customer address upon
  client request.
  
○ Product Manager/Store:
  ■ is responsible for adding, deleting and editing products & categories
  (depending on your design).
  ■ is responsible for validating comments.
  
● The comments must be approved by the product manager.

● The website is required  
  ○ to recommend relevant products to customers which needs to be tailored for each
  user or
  ○ to show up advertisements based on customers’ preferences or
  ○ to give points to products automatically according to customers’ comments.
  
● Two different platforms are required: e.g. mobile and web app.
