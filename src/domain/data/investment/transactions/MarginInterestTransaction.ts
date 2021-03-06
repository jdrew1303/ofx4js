/*
 * Copyright 2010 Web Cohesion
 *
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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='../../investment/accounts/SubAccountType'/>
///<reference path='BaseOtherInvestmentTransaction'/>
///<reference path='OriginalCurrency'/>

module ofx4js.domain.data.investment.transactions {

import SubAccountType = ofx4js.domain.data.investment.accounts.SubAccountType;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Transaction for journal security transactions between sub-accounts within the same investment
 * account.
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class MarginInterestTransaction extends BaseOtherInvestmentTransaction {

  private total: number;
  private subAccountFund: string;
  private currencyCode: string;
  private originalCurrencyInfo: OriginalCurrency;

  constructor() {
    super(TransactionType.MARGIN_INTEREST);
  }

  /**
   * Gets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the sub account type
   */
  public getSubAccountFund(): string {
    return this.subAccountFund;
  }

  /**
   * Sets the sub account type the margin interest affects (e.g. CASH, MARGIN, SHORT, OTHER).
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param subAccountFund the sub account type
   */
  public setSubAccountFund(subAccountFund: string): void {
    this.subAccountFund = subAccountFund;
  }

  /**
   * Gets the result of getSubAccountFund as one of the well-known types.
   *
   * @return the type of null if it wasn't one of the well known types.
   */
  public getSubAccountFundEnum(): SubAccountType {
    var type: string = this.getSubAccountFund();
    return type != null ? SubAccountType[type] : null;
  }

  /**
   * Gets the total for the transaction.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the total
   */
  public getTotal(): number {
    return this.total;
  }

  /**
   * Sets the total for the transaction.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param total the total
   */
  public setTotal(total: number): void {
    this.total = total;
  }

  /**
   * Gets the currency code for the transaction. Only one of currency code or original currency
   * info should be set according to the OFX spec. If neither are set, means the default currency.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the currency code for the transaction.
   */
  public getCurrencyCode(): string {
    return this.currencyCode;
  }

  /**
   * Sets the currency code for the transaction. Only one of currency code or original currency
   * info should be set according to the OFX spec. If neither are set, means the default currency.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param currencyCode the currency code for the transaction.
   */
  public setCurrencyCode(currencyCode: string): void {
    this.currencyCode = currencyCode;
    this.originalCurrencyInfo = null;
  }

  /**
   * Gets the original currency info for the transaction.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @return the original currency info for the transaction.
   */
  public getOriginalCurrencyInfo(): OriginalCurrency {
    return this.originalCurrencyInfo;
  }

  /**
   * Sets the original currency info for the transaction.
   * @see "Section 13.9.2.4.3, OFX Spec"
   *
   * @param originalCurrency the original currency info for the transaction.
   */
  public setOriginalCurrencyInfo(originalCurrency: OriginalCurrency): void {
    this.originalCurrencyInfo = originalCurrency;
    this.currencyCode = null;
  }
}

Aggregate_add( MarginInterestTransaction, "MARGININTEREST" );
Element_add(MarginInterestTransaction, { name: "SUBACCTFUND", order: 30, type: String, read: MarginInterestTransaction.prototype.getSubAccountFund, write: MarginInterestTransaction.prototype.setSubAccountFund });
Element_add(MarginInterestTransaction, { name: "TOTAL", order: 40, type: Number, read: MarginInterestTransaction.prototype.getTotal, write: MarginInterestTransaction.prototype.setTotal });
Element_add(MarginInterestTransaction, { name: "CURRENCY", order: 110, type: String, read: MarginInterestTransaction.prototype.getCurrencyCode, write: MarginInterestTransaction.prototype.setCurrencyCode });
Element_add(MarginInterestTransaction, { name: "ORIGCURRENCY", order: 120, type: OriginalCurrency, read: MarginInterestTransaction.prototype.getOriginalCurrencyInfo, write: MarginInterestTransaction.prototype.setOriginalCurrencyInfo });

}
