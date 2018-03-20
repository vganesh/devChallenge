import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Bar, Line} from 'react-chartjs-2';
import logo from './Earth.jpg';
import _ from 'lodash'

const getSalesData = function (displayDailySales, displayProductSales) {
    var url = '/salesData/';
    // console.log('url ' + url);
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            return response.json();
        }).then(function (myJson) {
        // console.log(myJson);
        displayDailySales(myJson);
        displayProductSales(myJson);
    })
        .catch((error) => {
            console.log('error   = ' + error);
        })

}


const updateProductSales = function (currentSaleItem, salesArray) {
    // console.log('updateProductSales = ')
    for (var ctr = 0; ctr < salesArray.length; ctr++) {
        if (salesArray[ctr].name === currentSaleItem.name) {
            for (var ctr2 = 0; ctr2 < salesArray[ctr].labels.length; ctr2++) {
                // locate the date label for this product.
                if (salesArray[ctr].labels[ctr2] === currentSaleItem.date) {
                    // the current date is found in the label array, add count to data
                    salesArray[ctr].datasets[0].data[ctr2] += currentSaleItem.count
                }
            }
            if (ctr2 === salesArray[ctr].labels.length) {
                // the current date is not found in the label array
                // add an element to the labels array with sale date
                // add an element to the data array with sale count
                salesArray[ctr].labels.push(currentSaleItem.date)
                salesArray[ctr].datasets[0].data.push(currentSaleItem.count)
            }
            break;
        }
    }
}
const addProductSales = function (currentSaleItem, salesArray) {
    // console.log('addProductSales = ')
    // this function will add sales information for a product
    var productSalesData = {}
    salesArray.push(productSalesData)
    productSalesData.name = currentSaleItem.name
    productSalesData.labels = []
    // sale date will be stored in the labels array
    productSalesData.labels.push(currentSaleItem.date)
    productSalesData.datasets = []

    var tmpObject = {
        label: 'Product Name',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
    }
    tmpObject.label = currentSaleItem.name
    tmpObject.data.push(currentSaleItem.count)

    productSalesData.datasets.push(tmpObject)
}


const updateDailySales = function (currentSaleItem, salesArray) {
    // this function will update daily sales information
    for (var ctr = 0; ctr < salesArray.length; ctr++) {
        if (salesArray[ctr].date === currentSaleItem.date) {
            salesArray[ctr].labels.push(currentSaleItem.item)
            salesArray[ctr].datasets[0].data.push(currentSaleItem.count)
            break;
        }
    }
}
const addDailySales = function (currentSaleItem, salesArray) {
    // console.log('addDailySales = ')
    // this function will add daily sales information
    var dailySalesData = {}
    salesArray.push(dailySalesData)
    dailySalesData.date = currentSaleItem.date
    dailySalesData.labels = []
    dailySalesData.labels.push(currentSaleItem.item)
    dailySalesData.datasets = []

    var tmpObject = {
        label: 'Daily sales Date: ',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
    }
    tmpObject.label += currentSaleItem.date.substr(4, 2) + '/' + currentSaleItem.date.substr(6) + '/' + currentSaleItem.date.substr(0, 4)
    tmpObject.data.push(currentSaleItem.count)
    dailySalesData.datasets.push(tmpObject)
}


// This functional component will render a line graph of sales by product name
function ProductSalesLine(props) {
    //console.log('ProductSalesLine = ' )

    var rows = []
    for (var ctr = 0; ctr < props.productNames.length; ctr++) {
        var tmpLineData = {
            labels: [],
            datasets: []
        }
        props.productSalesArray[ctr].labels.forEach(function (saleDate) {
            tmpLineData.labels.push(saleDate.substring(4, 6) + '/' + saleDate.substr(6, 7) + '/' + saleDate.substr(0, 4))
        })

        tmpLineData.datasets = props.productSalesArray[ctr].datasets
        rows.push(
            <Line
                key={ctr}
                data={tmpLineData}
            />
        )
    }

    return (
        <div>
            <h2>Product sales</h2>
            {rows}
        </div>
    )

}

// This functional component will render daily sales bar chart
function DailySalesBar(props) {
    // console.log('DailySalesBar = ' + props.dailySalesData.length)
    var rows = []
    for (var ctr = 0; ctr < props.dailySalesData.length; ctr++) {
        rows.push(
            <Bar
                key={ctr}
                data={props.dailySalesData[ctr]}
                width={3}
                height={1}
                options={{
                    maintainAspectRatio: true
                }}
            />
        )
    }

    return (
        <div>
            {rows}
        </div>
    )
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isDailySales: false,
            dailySalesArray: [],
            isProductSales: false,
            productNames: [],
            productSalesArray: []
        };
        // a very simple app that will get dailySalesData from the server and display it as a graph.
        // The browser refresh will get the latest information from the server again.
        this.calculateDailySales = this.calculateDailySales.bind(this)
        this.calculateProductSales = this.calculateProductSales.bind(this)
        getSalesData(this.calculateDailySales, this.calculateProductSales)
    }

    calculateProductSales(data) {
        // console.log('calculateProductSales')
        var salesData = data.salesData
        // sort the input data by name
        var sortedData = _.sortBy(salesData, 'name')
        var previousName = undefined
        var tmpProductSalesArray = []
        var tmpProductNames = []
        _.each(sortedData, function (currentSaleItem) {
            if (previousName === undefined) {
                previousName = currentSaleItem.name
                tmpProductNames.push(currentSaleItem.name)
                tmpProductSalesArray.push({
                    "date": currentSaleItem.date,
                    "name": currentSaleItem.name,
                    "count": currentSaleItem.count
                })
            } else {
                if (previousName === currentSaleItem.name) {
                    var foundItem = _.find(tmpProductSalesArray, function (currentItem) {
                        return (currentItem.date === currentSaleItem.date && currentItem.name === currentSaleItem.name);
                    })
                    if (foundItem === undefined) {
                        // this means you are looking at this item for the first time.
                        tmpProductSalesArray.push({
                            "date": currentSaleItem.date,
                            "name": currentSaleItem.name,
                            "count": currentSaleItem.count
                        })
                    } else {
                        // this means this particular item was added to the dailySales array previously.
                        foundItem.count += currentSaleItem.count
                    }
                } else {
                    previousName = currentSaleItem.name
                    tmpProductNames.push(currentSaleItem.name)
                    tmpProductSalesArray.push({
                        "date": currentSaleItem.date,
                        "name": currentSaleItem.name,
                        "count": currentSaleItem.count
                    })
                }
            }

        })

        var tmpProductSalesData = []
        previousName = undefined;
        // it is assumed tmpDailySalesArray is sorted on name
        _.each(tmpProductSalesArray, function (currentSaleItem) {

            if (previousName === undefined) {
                previousName = currentSaleItem.name
                addProductSales(currentSaleItem, tmpProductSalesData)
            } else {
                if (previousName === currentSaleItem.name) {
                    updateProductSales(currentSaleItem, tmpProductSalesData)
                } else {
                    addProductSales(currentSaleItem, tmpProductSalesData)
                    previousName = currentSaleItem.name
                }
            }
        })

        // change the state using the dailySalesData received from the server
        if (tmpProductSalesArray.length > 0) {
            this.setState({
                isProductSales: true,
                productNames: tmpProductNames,
                productSalesArray: tmpProductSalesData
            })
        } else {
            this.setState({
                isProductSales: false,
                productNames: tmpProductNames,
                productSalesArray: tmpProductSalesData
            })
        }


    }

    calculateDailySales(data) {
        var salesData = data.salesData
        // sort the input data by date
        var sortedData = _.sortBy(salesData, 'date')
        var previousDate = undefined
        var tmpDailySalesArray = []
        _.each(sortedData, function (currentSaleItem) {
            if (previousDate === undefined) {
                previousDate = currentSaleItem.date
                tmpDailySalesArray.push({
                    "date": previousDate,
                    "item": currentSaleItem.item,
                    "count": currentSaleItem.count
                })
            } else {
                if (previousDate === currentSaleItem.date) {
                    var foundItem = _.find(tmpDailySalesArray, function (currentItem) {
                        return currentItem.item === currentSaleItem.item;
                    })
                    if (foundItem === undefined) {
                        // this means you are looking at this item for the first time.
                        tmpDailySalesArray.push({
                            "date": currentSaleItem.date,
                            "item": currentSaleItem.item,
                            "count": currentSaleItem.count
                        })
                    } else {
                        // this means this particular item was added to the dailySales array previously.
                        foundItem.count += currentSaleItem.count
                    }
                } else {
                    previousDate = currentSaleItem.date
                    tmpDailySalesArray.push({
                        "date": previousDate,
                        "item": currentSaleItem.item,
                        "count": currentSaleItem.count
                    })
                }
            }
        })

        previousDate = undefined;
        var tmpDailySalesData = [];

        // it is assumed tmpDailySalesArray is sorted on date and the sale item will appear only once within that sale date
        _.each(tmpDailySalesArray, function (currentSaleItem) {

            if (previousDate === undefined) {
                previousDate = currentSaleItem.date
                addDailySales(currentSaleItem, tmpDailySalesData)
            } else {
                if (previousDate === currentSaleItem.date) {
                    updateDailySales(currentSaleItem, tmpDailySalesData)
                } else {
                    addDailySales(currentSaleItem, tmpDailySalesData)
                    previousDate = currentSaleItem.date
                }
            }
        })

        //console.log('dailySales length = ' + dailySales.length)
        // change the state using the dailySalesData received from the server
        if (tmpDailySalesArray.length > 0) {
            this.setState({
                isDailySales: true,
                dailySalesArray: tmpDailySalesData
            })
        } else {
            this.setState({
                isDailySales: false,
                dailySalesArray: tmpDailySalesData
            })
        }
    }


    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Brauss</h1>
                </header>
                <p className="App-intro">
                </p>
                {this.state.isDailySales && <DailySalesBar dailySalesData={this.state.dailySalesArray}/>}
                {this.state.isProductSales && <ProductSalesLine productNames={this.state.productNames}
                                                                productSalesArray={this.state.productSalesArray}/>}
            </div>
        );
    }
}

export default App;


