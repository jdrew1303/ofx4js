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
///<reference path='../../../meta/Aggregate_add'/>
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='../MessageSetType'/>
///<reference path='../RequestMessage'/>
///<reference path='../RequestMessageSet'/>
///<reference path='../investment/statements/InvestmentStatementRequestTransaction'/>
///<reference path='SecurityListRequestTransaction'/>

module ofx4js.domain.data.seclist {

import MessageSetType = ofx4js.domain.data.MessageSetType;
import RequestMessage = ofx4js.domain.data.RequestMessage;
import RequestMessageSet = ofx4js.domain.data.RequestMessageSet;
import InvestmentStatementRequestTransaction = ofx4js.domain.data.investment.statements.InvestmentStatementRequestTransaction;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * Security list request message set.
 * @see "Section 13.7.2.2.1, OFX Spec"
 *
 * @author Jon Perlow
 */
export class SecurityListRequestMessageSet extends RequestMessageSet {

  private securityListRequest: SecurityListRequestTransaction;

  public getType(): MessageSetType {
    return MessageSetType.investment;
  }

  /**
   * Gets the security list request.
   *
   * @return the request
   */
  public getSecurityListRequest(): SecurityListRequestTransaction {
    return this.securityListRequest;
  }

  /**
   * Sets the security list request.
   *
   * @param statementRequest the request
   */
  public setSecurityListRequest(statementRequest: SecurityListRequestTransaction): void {
    this.securityListRequest = statementRequest;
  }

  // Inherited.
  public getRequestMessages(): Array<RequestMessage> {
    var requestMessages: Array<RequestMessage> = new Array<RequestMessage>();
    if (this.getSecurityListRequest() != null) {
      requestMessages.push(this.getSecurityListRequest());
    }
    return requestMessages;
  }
}

Aggregate_add( SecurityListRequestMessageSet, "SECLISTMSGSRQV1" );
ChildAggregate_add(SecurityListRequestMessageSet, { order: 0, type: SecurityListRequestTransaction, read: SecurityListRequestMessageSet.prototype.getSecurityListRequest, write: SecurityListRequestMessageSet.prototype.setSecurityListRequest });

}
