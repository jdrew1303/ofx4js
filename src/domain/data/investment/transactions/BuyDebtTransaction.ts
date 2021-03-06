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
///<reference path='../../../../meta/Element_add'/>
///<reference path='../../../../meta/ChildAggregate_add'/>
///<reference path='BaseBuyInvestmentTransaction'/>

module ofx4js.domain.data.investment.transactions {

import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Transaction for buying debt (i.e. bonds, CDs, etc.,).
 * @see "Section 13.9.2.4.4, OFX Spec"
 *
 * @author Jon Perlow
 */
export class BuyDebtTransaction extends BaseBuyInvestmentTransaction {

  private accruedInterest: number;

  constructor() {
    super(TransactionType.BUY_DEBT);
  }

  /**
   * Gets the amount of accrued interest on the debt. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @return the amount of accrued interest
   */
  public getAccruedInterest(): number {
    return this.accruedInterest;
  }

  /**
   * Sets the amount of accrued interest on the debt. This is an optional field according to the
   * OFX spec.
   * @see "Section 13.9.2.4.4, OFX Spec"
   *
   * @param accruedInterest the amount of accrued interest
   */
  public setAccruedInterest(accruedInterest: number): void {
    this.accruedInterest = accruedInterest;
  }
}

Aggregate_add( BuyDebtTransaction, "BUYDEBT" );
Element_add(BuyDebtTransaction, { name: "ACCRDINT", order: 20, type: Number, read: BuyDebtTransaction.prototype.getAccruedInterest, write: BuyDebtTransaction.prototype.setAccruedInterest });

}
