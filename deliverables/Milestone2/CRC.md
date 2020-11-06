# CRC Cards

| User                    |                 |
| ----------------------- | --------------- |
| Responsibility                                | Collaborator  |
| can register                                  |               |
| has attributes (firstname, lastname, etc.)    |               |
| can login after being registered              |               |
| can own products                              |  Product      |
| can buy/loan products                         |  Product      |
| has a shopping cart                           |  Product      |
| knows products he has bought/lent             |  Product      |
| knows amount in wallet                        |  Wallet       |

| Admin                    | Subclass of User |
| ------------------------ | ---------------- |
| Responsibility                                | Collaborator  |
| can approve/reject products                   | Product       |

| Product                 |                 |
| ----------------------- | --------------- |
| Responsibility                                    | Collaborator  |
| has owner                                         |  User         |
| has attributes (title, description, price, etc.)  |               |
| has reviews                                       |  Review       |
| can be added, updated and deleted                 |               |
| can be purchased or rented and knows by whom      |  User         |

| Service                 | Subclass of Product |
| ----------------------- | ------------------- |
| Responsibility                                                | Collaborator  |
| has attributes (price per hour, conditions, location, etc)    |               |
| has available time table/calendar                             |               |

| Review                 |                 |
| ---------------------- | --------------- |
| Responsibility                        | Collaborator  |
| has author                            |  User         |
| has attributes (rating, description)  |               |
| has product or person it reviews      |  User/Product |

| Shopping Cart          |                 |
| ---------------------- | --------------- |
| Responsibility                        | Collaborator  |
| has owner                             |  User         |
| has list of products                  |  Product      |
| knows current total price             |  Product      |

| Wallet                 |                 |
| ---------------------- | --------------- |
| Responsibility                        | Collaborator  |
| has owner                             |  User         |
| has amount of money                   |               |

| Transaction            |                 |
| ---------------------- | --------------- |
| Responsibility                        | Collaborator  |
| has product/service owner and buyer   |  User         |
| has product which is bought           |  Product      |
| knows price of product                |  Product      |


