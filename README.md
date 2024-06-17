#WildOasis

This is React.js application created with Vite and with Supabase API for the backend.  
The app is developed for the administration of the Wild-Oasis Complex Hotel.  
The Wild-Oasis has 8 cabins with different capacity.  
I'm using the Supabase API for Authentication and Authorization of Users using jwt behind the scenes.  
The administrator job is to see the bookings from the guests, review them, contact guests, check in them and check out them and delete some bookings if needed.  
Also the admin has Setting panel where he set some default settings like the breakfast price, minimum and maximum nights allowed to book and maximum guests per booking.  
I've implemented different filters about the Cabins and Bookings such as filter so that the administrators can easily see the data.  
Also I've implemented a Dashboard home page where the Administrators can more easily see some charts and data like
the total bookings, total sales, total check ins, occupancy rate of the cabins and more for the last 7, 30 and 90 days!  
Also I've implemented a Dark Mode for those who like it.  
Also the Admins can Edit their profile and can upload Avatar picture, change their Name and also update their password and logout.  
_NOTE_ :
When you are registering you must enter valid mail because after the registration you need to open your mail and confirm the registration. The link will be sent to your mail.  
 If you don't want to enter your e-mail in order to register, you can always use the Temp-mail from this website: [towav94359@dalebig.com](https://temp-mail.org/)
Or you can use some of the users that I created before: email: oasis@gmail.com password: test1234
I'm using some advance react patterns for the Modals and Menu with Compound-components.  
Styled Components for the style of the app.  
Tanstack query known as React Query for fetching and posting data to the Supabase API.  
React Recharts for displaying beautiful Charts and Pies.  
React Router Dom for navigating through the layout of the app.  
React Error Boundary for catching developer's errors if have any.  
React Hook Form for easier work with Forms.  
React Toasts for displaying beautiful messages on the UI.  
Date-fns for manipulating easier with javascript dates.

The App is hosted live on Netlify, you can check it here: https://wild-oasis-aleksandro.netlify.app/  
The App is hosted live on Vercel, you can check it here: https://the-wild-oasis-aleksandro.vercel.app/dashboard
