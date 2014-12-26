/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var inherit = require("../../../../util/inherit");

var SubAccountType = require("../accounts/SubAccountType");
var Inv401KSource = require("../positions/Inv401KSource");
var PositionType = require("../positions/PositionType");
var Aggregate = require("../../../../meta/Aggregate");
var ChildAggregate = require("../../../../meta/ChildAggregate");
var Element = require("../../../../meta/Element");
var BaseOtherInvestmentTransaction = require("./BaseOtherInvestmentTransaction");
var TransactionType = require("./TransactionType");
var TransferAction = require("./TransferAction");

/**
 * Transaction for transfers.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @class
 * @augments BaseOtherInvestmentTransaction
 */
function TransferInvestmentTransaction () {
  // TODO (jonp) -- INVACCTFROM
  BaseOtherInvestmentTransaction.call(this, TransactionType.TRANSFER);

  /**
   * @name TransferInvestmentTransaction#securityId
   * @type SecurityId
   * @access private
   */
  this.securityId = null;

  /**
   * @name TransferInvestmentTransaction#subAccountSecurity
   * @type String
   * @access private
   */
  this.subAccountSecurity = null;

  /**
   * @name TransferInvestmentTransaction#units
   * @type Double
   * @access private
   */
  this.units = null;

  /**
   * @name TransferInvestmentTransaction#transferAction
   * @type String
   * @access private
   */
  this.transferAction = null;

  /**
   * @name TransferInvestmentTransaction#positionType
   * @type String
   * @access private
   */
  this.positionType = null;

  /**
   * @name TransferInvestmentTransaction#averageCostBasis
   * @type Double
   * @access private
   */
  this.averageCostBasis = null;

  /**
   * @name TransferInvestmentTransaction#unitPrice
   * @type Double
   * @access private
   */
  this.unitPrice = null;

  /**
   * @name TransferInvestmentTransaction#purchaseDate
   * @type Date
   * @access private
   */
  this.purchaseDate = null;

  /**
   * @name TransferInvestmentTransaction#inv401kSource
   * @type String
   * @access private
   */
  this.inv401kSource = null;
}

inherit(TransferInvestmentTransaction, "extends", BaseOtherInvestmentTransaction);


Aggregate.add("TRANSFER", TransferInvestmentTransaction);


/**
 * Gets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {SecurityId} the security id of the security that was transferred
 */
TransferInvestmentTransaction.prototype.getSecurityId = function() {
  return this.securityId;
};
ChildAggregate.add({required: true, order: 20, owner: TransferInvestmentTransaction, /*type: SecurityId,*/ fcn: "getSecurityId"});


/**
 * Sets the id of the security that was transferred. This is a required field according to the OFX
 * spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {SecurityId} securityId the security id of the security that was transferred
 */
TransferInvestmentTransaction.prototype.setSecurityId = function(securityId) {
  this.securityId = securityId;
};


/**
  * Gets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
  * @see "Section 13.9.2.4.3, OFX Spec"
  *
  * @return {String} the sub account type
  */
TransferInvestmentTransaction.prototype.getSubAccountSecurity = function() {
  return this.subAccountSecurity;
};
Element.add({name: "SUBACCTSEC", order: 30, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "getSubAccountSecurity"});


/**
  * Sets the sub account type for the security (e.g. CASH, MARGIN, SHORT, OTHER).
  * @see "Section 13.9.2.4.3, OFX Spec"
  *
  * @param {String} subAccountSecurity the sub account type
  */
TransferInvestmentTransaction.prototype.setSubAccountSecurity = function(subAccountSecurity) {
   this.subAccountSecurity = subAccountSecurity;
 };


/**
 * Gets the result of getSubAccountSecurity as one of the well-known types.
 *
 * @return {SubAccountType} the type of null if it wasn't one of the well known types.
 */
TransferInvestmentTransaction.prototype.getSubAccountSecurityEnum = function() {
  return SubAccountType.fromOfx(this.getSubAccountSecurity());
};


/**
 * Gets the number of units of the security that was transferred. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the number of units transferred
 */
TransferInvestmentTransaction.prototype.getUnits = function() {
  return this.units;
};
Element.add({name: "UNITS", required: true, order: 40, owner: TransferInvestmentTransaction, /*type: Double,*/ fcn: "getUnits"});


/**
 * Sets the number of units of the security that was transferred. For security-based actions other
 * than stock splits, this is the quantity bought. For stocks, mutual funds, and others, this
 * is the number of shares. For bonds, this is the face value. For options, this is the number of
 * contacts. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} units the number of units transferred
 */
TransferInvestmentTransaction.prototype.setUnits = function(units) {
  this.units = units;
};


/**
 * Gets the type of transfer. One of "IN" or "OUT". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the type of transfer
 */
TransferInvestmentTransaction.prototype.getTransferAction = function() {
  return this.transferAction;
};
Element.add({name: "TFERACTION", required: true, order: 50, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "getTransferAction"});


/**
 * Sets the type of transfer. One of "IN" or "OUT". This is a required field according to the
 * OFX spec.
 *
 * @param {String} transferAction the type of transfer
 */
TransferInvestmentTransaction.prototype.setTransferAction = function(transferAction) {
  this.transferAction = transferAction;
};


/**
 * Gets the transfer action as one of the well-known types.
 *
 * @return {TransferAction} the type of transfer or null if it's not well known
 */
TransferInvestmentTransaction.prototype.getTransferActionEnum = function() {
  return TransferAction.fromOfx(this.getTransferAction());
};


/**
 * Gets the type of position. One of "LONG" or "SHORT". This is a required field according to the
 * OFX spec.
 *
 * @return {String} the position type
 */
TransferInvestmentTransaction.prototype.getPositionType = function() {
  return this.positionType;
};
Element.add({name: "POSTYPE", required: true, order: 60, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "getPositionType"});


/**
 * Sets the type of position. One of "LONG" or "SHORT". This is a required field according to the
 * OFX spec.
 *
 * @param {String} positionType the position type
 */
TransferInvestmentTransaction.prototype.setPositionType = function(positionType) {
  this.positionType = positionType;
};


/**
 * Gets the position type as one of the well-known types.
 *
 * @return {PositionType} the position type or null if it's not well known
 */
TransferInvestmentTransaction.prototype.getPositionTypeEnum = function() {
  return PositionType.fromOfx(this.getPositionType());
};


/**
 * Gets the average cost basis for the securities being transfered. This is an optional field
 * according to the ofx spec.
 *
 * @return {Double} the average cost basis
 */
TransferInvestmentTransaction.prototype.getAverageCostBasis = function() {
  return this.averageCostBasis;
};
Element.add({name: "AVGCOSTBASIS", order: 70, owner: TransferInvestmentTransaction, /*type: Double,*/ fcn: "getAverageCostBasis"});


/**
 * Sets the average cost basis for the securities being transfered. This is an optional field
 * according to the ofx spec.
 *
 * @param {Double} averageCostBasis the average cost basis
 */
TransferInvestmentTransaction.prototype.setAverageCostBasis = function(averageCostBasis) {
  this.averageCostBasis = averageCostBasis;
};


/**
 * Gets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {Double} the per unit price
 */
TransferInvestmentTransaction.prototype.getUnitPrice = function() {
  return this.unitPrice;
};
Element.add({name: "UNITPRICE", required: true, order: 80, owner: TransferInvestmentTransaction, /*type: Double,*/ fcn: "getUnitPrice"});


/**
 * Sets the price per commonly-quoted unit. For stocks, mutual funds, and others, this is the
 * share price. For bonds, this is the percentage of par. For options, this is the per share (not
 * per contact) price. This is a required field according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {Double} unitPrice the per unit price
 */
TransferInvestmentTransaction.prototype.setUnitPrice = function(unitPrice) {
  this.unitPrice = unitPrice;
};


/**
 * Gets the original date of purchase for the securities. This is an optional field according to
 * the ofx spec.
 *
 * @return {Date} the original date of purchase
 */
TransferInvestmentTransaction.prototype.getPurchaseDate = function() {
  return this.purchaseDate;
};
Element.add({name: "DTPURCHASE", order: 90, owner: TransferInvestmentTransaction, /*type: Date,*/ fcn: "getPurchaseDate"});


/**
 * Sets the original date of purchase for the securities. This is an optional field according to
 * the ofx spec.
 *
 * @param {Date} purchaseDate the original date of purchase
 */
TransferInvestmentTransaction.prototype.setPurchaseDate = function(purchaseDate) {
  this.purchaseDate = purchaseDate;
};


/**
 * Gets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @return {String} the state withholding
 */
TransferInvestmentTransaction.prototype.get401kSource = function() {
  return this.inv401kSource;
};
Element.add({name: "INV401KSOURCE", order: 100, owner: TransferInvestmentTransaction, /*type: String,*/ fcn: "get401kSource"});


/**
 * Sets the 401K source for the transfer. Should be one of "PRETAX", "AFTERTAX", "MATCH",
 * "PROFITSHARING", "ROLLOVER", "OTHERVEST", "OTHERNONVEST".  This is an optional field
 * according to the OFX spec.
 * @see "Section 13.9.2.4.3, OFX Spec"
 *
 * @param {String} inv401kSource the state withholding
 */
TransferInvestmentTransaction.prototype.set401kSource = function(inv401kSource) {
  this.inv401kSource = inv401kSource;
};


/**
 * Gets the 401(k) source as one of the well-known types.
 *
 * @return {Inv401KSource} the type of close or null if it's not well known.
 */
TransferInvestmentTransaction.prototype.get401kSourceEnum = function() {
  return Inv401KSource.fromOfx(this.get401kSource());
};




module.exports = TransferInvestmentTransaction;