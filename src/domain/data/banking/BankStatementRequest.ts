/*
 * Copyright 2008 Web Cohesion
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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../common/StatementRequest'/>
///<reference path='BankAccountDetails'/>

module ofx4js.domain.data.banking {

import StatementRequest = ofx4js.domain.data.common.StatementRequest;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;
import Aggregate_add = ofx4js.meta.Aggregate_add;

/**
 * @author Ryan Heaton
 */
export class BankStatementRequest extends StatementRequest {

  private account: BankAccountDetails;

  /**
   * The account details.
   *
   * @return The account details.
   */
  public getAccount(): BankAccountDetails {
    return this.account;
  }

  /**
   * The account details.
   *
   * @param account The account details.
   */
  public setAccount(account: BankAccountDetails): void {
    this.account = account;
  }

}

Aggregate_add( BankStatementRequest, "STMTRQ" );
ChildAggregate_add(BankStatementRequest, { name: "BANKACCTFROM", required: true, order: 0, type: BankAccountDetails, read: BankStatementRequest.prototype.getAccount, write: BankStatementRequest.prototype.setAccount });

}
