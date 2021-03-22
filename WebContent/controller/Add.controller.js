/*global location */
sap.ui.define([
		"pizza/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"pizza/model/formatter"
	], function (BaseController, JSONModel, formatter) {
		"use strict";

		return BaseController.extend("pizza.controller.Add", {

			formatter: formatter,

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			onInit : function () {
				// Model used to manipulate control states. The chosen values make sure,
				// detail page is busy indication immediately so there is no break in
				// between the busy indication for loading the view's meta data
				var oViewModel = new JSONModel({
					busy : false,
					delay : 0,
					lineItemListTitle : this.getResourceBundle().getText("detailLineItemTableHeading"),
					order: {
						"OrderId": "",
						"OrderNo": "10",
						"OrderDate": "2018-03-05T14:03:30",
						"CustomerName": "Walkin Customer",
						"TotalAmount": "0",
						"Currency": "INR",
						"NavOrderItems": [
						]
					}
				});

				this.getRouter().getRoute("anubhav").attachPatternMatched(this._onObjectMatched, this);

				this.setModel(oViewModel, "addView");

				this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
			},
			addNewPizza: function(){
				var oViewModel = this.getView().getModel("addView");
				
				var items = oViewModel.getProperty("/order/NavOrderItems");
				
				var simpleData = {
						"ItemId": "",
						"OrderId": "",
						"ItemNo": items.length + 1,
						"ProductId": "",
						"Qty": "1",
						"Uom": "PC"
				};
				items.push(simpleData);
				oViewModel.setProperty("/order/NavOrderItems", items);
			},
			_onObjectMatched : function (oEvent) {
				
				
			},
			onSave: function(){
				
				var oDataObject = this.getView().getModel();
				var oViewModel = this.getView().getModel("addView");
				var payload = oViewModel.getProperty("/order");
				payload.OrderNo = parseInt(payload.OrderNo);
				payload.OrderDate = JSON.stringify(new Date());
				oDataObject.create("/OrdersSet",payload,{
					success: function(){
						sap.m.MessageToast.show("Your order has been created successfully, 20 mins or free");
					},
					error: function(){
						sap.m.MessageBox.error("Some error, please gime time to bake pizza");
					}
				});
				
				
			},

			_onMetadataLoaded : function () {
				
			}

		});

	}
);