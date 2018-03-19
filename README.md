## Synopsis

Brauss is a large dairy products company based in Berlin, Germany. Brauss has been paying close attention to a recently launched line of products: Chocolate puddings. As such, they have started building a web-based dashboard that will help them monitor the sales of chocolate pudding on a monthly basis.

There is an important executive board meeting in 3 hours, and the board would like to use the dashboard to understand chocolate pudding performance. Unfortunately, their full-stack developer has recently quit his job and left them with an undocumented code base. The CEO's assistant has called you to add some charts to the dashboard to give some insights on pudding sales in early June.

You have received source code and a data export from an external database (IT helped him with that) in a file called data/data.csv. The executives would like to see several simple line charts, as described in the details below.

## Installation

To install packages: npm install
To start the application: npm start

## Guidance

* Brauss have no time for database setup. So you will have to find a way to load in the data file. Feel free to change the file format, but the data column names and data values cannot be changed manually.
* All data transformations or aggregations should occur on the server side.
* The executives would like to see several line charts in the dashboard:
1) Total daily pudding items sold
2) Average daily pudding items sold per customer
3) Total daily item sales, split into a line for each pudding item (Dani, Milki etc)
* KEY FILES: dataAccessLayer.js, api.js, ui/states/dashboardCtrl.js, ui/states/dashboard.html
* Please push your updated work to GitHub and upload a link to the repository on BringIt 
* Provide some comments below about how this application should be better designed.

Provide comments below:

1) npm install 
2) npm start 
3) From your browser go to the URL http://localhost:8000/

A very simple app that will get data from the server and display it as a graph using reactjs components. 
The browser refresh will get the latest information from the server again. 
