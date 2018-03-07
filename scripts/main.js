(function (window){
    'use strict';
    var $ = window.jQuery;
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var myTruck = new Truck('Falcon',new DataStore());
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);

    $('#payment').on('click',function(){
        window.location.replace('paymentForm.html');
    });
    
    formHandler.addSubmitHandler(function(data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.addRow.call(checkList, data);
    });

    console.log(formHandler);
    window.myTruck = myTruck;
})(window);
