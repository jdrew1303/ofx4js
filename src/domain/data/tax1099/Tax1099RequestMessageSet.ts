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
///<reference path='../MessageSetType'/>
///<reference path='../RequestMessageSet'/>
///<reference path='Tax1099RequestTransaction'/>

module ofx4js.domain.data.tax1099 {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * @author aparna.gawali
 * aparna.gawali@sungard.com
 * 
 */
export class Tax1099RequestMessageSet extends RequestMessageSet {

  private taxRequestTransaction: Tax1099RequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.tax1099;
  }

  /**
   * The statement request.
   *
   * @return The statement request.
   */
  public getTaxRequestTransaction(): Tax1099RequestTransaction {
    return this.taxRequestTransaction;
  }

  /**
   * The statement request.
   *
   * @param taxRequestTransaction The statement request.
   */
  public setTaxRequestTransaction(taxRequestTransaction: Tax1099RequestTransaction) {
    this.taxRequestTransaction = taxRequestTransaction;
  }

  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();
    if (this.getTaxRequestTransaction() != null) {
      requestMessages.push(this.getTaxRequestTransaction());
    }
    return requestMessages;
  }
}

Aggregate_add(Tax1099RequestMessageSet, "TAX1099MSGSRQV1" );
ChildAggregate_add(Tax1099RequestMessageSet, { order: 0, type: Tax1099RequestTransaction, read: Tax1099RequestMessageSet.prototype.getTaxRequestTransaction, write: Tax1099RequestMessageSet.prototype.setTaxRequestTransaction });

}
