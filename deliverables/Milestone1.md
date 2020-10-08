# Website Name
## Use Case Diagram

![Use Case Diagram](Use_Case_Diagram.png)

## Use Cases

- Registration
- Login

## Use Case Description

| User Registration |               |
| ----------------- | ------------- |
| Description       | A new user comes to the website and wants to create an account. |
| Actors            | New User |
| Pre-Condition     | The system must be online. The user must have an e-mail address. |
| Post-Condition    | The user will have an account. |
| Main Scenario     | 1. The user enters at least the necessary data. |
|                   | 2. The website checks wether the entered data matches the requirements. |
|                   | 3. The user is logged in and has an account |
| Extensions        | 1a. The user doesn't fill out every necessary field. A message showing that this field is necessary is sent. |
|                   | 2a. The entered username or e-mail is already used. A message asking for a different one is sent. |
|                   | 2b. The entered password doesn't meet the requirements. A message for a different one is sent, showing what is missing. |

| User Login        |               |
| ----------------- | ------------- |
| Description       | A user comes to the website and can log in to his previously created account. |
| Actors            | Registered User |
| Pre-Condition     | The system must be online. The user must have an account. |
| Post-Condition    | The user is logged in. |
| Main Scenario     | 1. The user enters his username or e-mail and his password. |
|                   | 2. The website checks wether an account with these informations exists. |
|                   | 3. The user is logged in. |
| Extensions        | 2a. The user enters a wrong username or e-mail. A message showing that no user with such a username or e-mail exists is sent. |
|                   | 2b. The user enters a wrong password. A message showing that the wrong password was entered is sent. |

## User Stories

### 1. Story

Hans wants to be able to look at the website without loging in, 
in order to get a first look at the products without having to register.
(functional)

### 2. Story

Hans has long workig hours and doesn't have a lot of free time. 
So he doesn't want to spend a lot of time reistering and trying to understand the website.
(non-functional)

### 3. Story

Hans wants to register himself and then be able to log in during later sessions, 
this way he can use the full functionality of the website.
(functional)

### 4. Story

Hans doesn't want his private data to be public, 
so he relies on the website to keep his personal details private.
(non-functional)

### 5. Story

One day Hans returns to the website and can't log in because he forgot his password,
but luckily there is an option for him to change his password. Better remember it this time!
(functional)

## Functional Requirements

- Registartion: A user has to be able to register, 
this data needs to be stored and accessible the next time the user visits the website.
- Login: A user has to be able to login, after he has registered himself earlier,
by using his username/email and password.
- Viewing Website: A user needs to able to look at the website without beeing logged in. 

## Non-Functional Requirements

- Privacy: The stored user data must be kept private and only be accessible for the user.
The user may ask for the data to be deleted.

## CRC Cards


