# Overview

Boat-rental is an application that allows users to post and rent boats for a specified time period.

The project consists of 2 main modules:

- Server(SoftUni Practice Server)
- SPA built with React

# Run app locally

In order to run the SoftUni Practice Server, go to the `server` folder and run the following command:

```
node server.js
```

After the server is running, the front end app can be initiated from the root folder:

```
npm install
npm run start
```

# Main functionalities

### Unauthenticated user

- View all listings
- View detailed information about individual listings
- Search by name and filter by type
- Register/Login

### Authenticated user

- View all listings
- View detailed information about individual listings
- Search by name and filter by type
- Create listing
- Edit/Delete own listings
- View sent and received quotes
- Get quotes for other users' listings
- Approve/Reject quotes for user's own listings

# Architecture overview
The application code is devided into the following logical chunks:

- App.js - app initialization and routes 
- components - consists of all ui components 
- constants
- contexts - currently used for AuthContext (user authentication)
- hooks - consists of custom hook for using the local storage
- routeGuards - guard that ensures that the user has access to particular views
- services - used for API requests and validation logic
- utils - reusable common utilities


# Main views

### Landing page

On the landing page the latest listings are shown.
![image](https://user-images.githubusercontent.com/103183759/185068175-fac927e7-0854-4438-a95e-1f2a08ce5c7a.png)

### Boats page

Shows a catalog of all listings (if there are any) with the posibility to search boats by name and by type.
![image](https://user-images.githubusercontent.com/103183759/185067605-18b4e8ee-50bb-4db4-8247-53fbb65697a5.png)
![image](https://user-images.githubusercontent.com/103183759/185064399-b968fb2b-8b9b-4a0b-baad-f19d931c5dfb.png)

### Login and Register pages

Login and register functionalities with input validation and error handling

![image](https://user-images.githubusercontent.com/103183759/185068838-0fc47c93-74d6-4fcd-8e7e-e858677b00bd.png)
![image](https://user-images.githubusercontent.com/103183759/185069726-0e62a80c-c536-4098-9282-1cb4a61172cf.png)

### Details page for logged in users

Logged in users can get quotes for listed boats by choosing specific time period (time period is validated).
![image](https://user-images.githubusercontent.com/103183759/185072201-679486d9-18f0-4139-8c7c-9338fcef5026.png)

### Details page for owner of the listing

Logged in user that is owner of the listing can access edit and delete buttons through the details page.
![image](https://user-images.githubusercontent.com/103183759/185071998-fd38192f-e08d-4fc8-bc4a-8799205a94ff.png)
![image](https://user-images.githubusercontent.com/103183759/185073360-dbd27f2f-2057-4447-9ffb-a962e086f99b.png)

### Create page

Allows users to create their own listing. Form inputs are beign validated.
![image](https://user-images.githubusercontent.com/103183759/185065280-9ff1be23-f45a-47a1-8343-09c4355a8ce5.png)

### Edit page

Owner of the current listing can edit the information about it. Form inputs are beign validated.
![image](https://user-images.githubusercontent.com/103183759/185074318-987c32b7-ac99-4e60-872e-c995e653c795.png)

### My profile page

Every user has a my profile page, where they can see basic user information and information about the quotes concerning the current user (quotes that he made and quotes that were made for his listings). The quotes are separated into two tables, where you have the option to accept or reject a quote.
![image](https://user-images.githubusercontent.com/103183759/185078383-12aaa971-4b15-4753-b5b4-f87ad40424d0.png)

### Error page

When you enter invalid route
![image](https://user-images.githubusercontent.com/103183759/186136159-2e215c8b-b85e-4dc6-9e2b-ca14a1042e77.png)

# Car-rental
