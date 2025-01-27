(function (window){
    'use strict';
    var $ = window.jQuery;
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://localhost:2403/coffeeorders';
    var App = window.App;
    var Truck = App.Truck;
    //var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('Falcon',remoteDS);
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    var formHandler = new FormHandler(FORM_SELECTOR);

    $('#payment').on('click',function(){
        window.location.replace('paymentForm.html');
    });

    remoteDS.getAll(function (data){
        myTruck.createOrder.call(myTruck,data);
        checkList.addRow.call(checkList,data);
    });

    formHandler.addSubmitHandler(function(data) {
        console.log(data);
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });


    console.log(formHandler);
    window.myTruck = myTruck;
})(window);
