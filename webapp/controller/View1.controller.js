sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	"sap/m/TableSelectDialog",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageStrip",
	"sap/ui/table/Table",
	"sap/ui/table/Column"
], function (Controller, Fragment, table, JSONModel, MessageToast, Filter, FilterOperator, MessageStrip, Table, Column) {
	"use strict";

	return Controller.extend("sap.json.data.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.json.data.view.View1
		 */

		onInit: function () {
			this.model = new JSONModel();
			this.model.loadData("model/products.json");
			sap.ui.getCore().setModel(this.model);
			this.content = this.getView().byId("idCon");
		},

		addDynamicTable: function () {
			var tb = new Table("idTab", {
				rowSelectionChange: this.itemChanges.bind(this)
			});
			tb.bindRows("/products");

			this.content.addContent(tb);
			var t = sap.ui.getCore().byId("idTab");
			var c = new Column("id", {});
			c.setLabel("Product Name");
			var c1 = new Column("id1", {});
			c1.setLabel("Price");
			c1.setTemplate("Price");
			c.setTemplate("Name");
			t.addColumn(c);
			t.addColumn(c1);
		},

		itemChanges: function () {
			this.content.addContent(MessageToast.show("Item selection changes"));
		}

	});

});