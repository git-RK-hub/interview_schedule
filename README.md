# interview_schedule

Live: https://scheduler-a4a5a.web.app/

## To run server
1. cd backend
2. npm install
3. npm run dev 

## To run client
1. cd frontend
2. npm install
3. npm start

#Problem Statement

Create a simple app where admins can create interviews by selecting participants, interview start time and end time

Basic Requirements
    1. An interview creation page where the admin can create an interview by selecting participants, start time and end time. Backend should throw error with proper error message if: 
        a. Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
        b. No of participants is less than 2
    2. An interviews list page where admin can see all the upcoming interviews.
    3. An interview edit page where admin can edit the created interview with the same validations as on the creation page.
