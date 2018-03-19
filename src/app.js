import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Bar} from 'react-chartjs-2';
import logo from './Earth.jpg';
import _ from 'lodash'

const getSalesData = function (displayDailySales) {
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
    })
        .catch((error) => {
            console.log('error   = ' + error);
        })

}
const addSalesItem = function (currentSaleItem, salesArray) {
    for (var ctr=0; ctr < salesArray.length ; ctr++ ) {
        if ( salesArray[ctr].date === currentSaleItem.date ) {
            salesArray[ctr].labels.push(currentSaleItem.item)
            salesArray[ctr].datasets[0].data.push(currentSaleItem.count)
            break;
        }
    }
}
//                addCurrentSaleItem(currentSaleItem, tmpIsDailySales, tmpDailySalesData)
const addSalesDate = function (currentSaleItem, salesArray) {
    console.log('addSalesDate = ')
    // this function will add the following information based on the parameters
    var dailySalesData = {}
    salesArray.push(dailySalesData)
    dailySalesData.date=currentSaleItem.date
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
    tmpObject.label += currentSaleItem.date.substr(4,2)+'/'+currentSaleItem.date.substr(6)+'/'+currentSaleItem.date.substr(0,4)
    tmpObject.data.push(currentSaleItem.count)
    dailySalesData.datasets.push(tmpObject)
}

// This functional component will render daily sales bar chart
function DailySalesBar(props) {
    console.log('DailySalesBar = '+ props.dailySalesData.length)
    var rows = []
    for (var ctr=0; ctr < props.dailySalesData.length ; ctr++ ) {
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
            dailySalesArray: []
        };
        // a very simple app that will get dailySalesData from the server and display it as a graph.
        // The browser refresh will get the latest information from the server again.
        this.calculateDailySales = this.calculateDailySales.bind(this)
        getSalesData(this.calculateDailySales)

    }

    calculateDailySales(data) {
        var salesData = data.salesData;
        // sort the input data by date
        var sortedData = _.sortBy(salesData, 'date');
        var previousDate = undefined;
        var tmpDailySalesArray = []
        _.each(sortedData, function (currentSaleItem) {
            if (previousDate === undefined) {
                previousDate = currentSaleItem.date
                tmpDailySalesArray.push({"date": previousDate, "item": currentSaleItem.item, "count": currentSaleItem.count})
            } else {
                if (previousDate === currentSaleItem.date) {
                    var foundItem = _.find(tmpDailySalesArray, function (currentItem) {
                        return currentItem.item === currentSaleItem.item;
                    })
                    if (foundItem == undefined) {
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

        // it is assumed dailySales is sorted on date and the sale item will appear only once within that sale date
        _.each(tmpDailySalesArray, function (currentSaleItem) {

            if (previousDate === undefined) {
                previousDate = currentSaleItem.date
                addSalesDate(currentSaleItem,  tmpDailySalesData)
            } else {
                if (previousDate === currentSaleItem.date) {
                    addSalesItem(currentSaleItem, tmpDailySalesData)
                } else {
                    addSalesDate(currentSaleItem,  tmpDailySalesData)
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
            </div>
        );
    }
}

export default App;



