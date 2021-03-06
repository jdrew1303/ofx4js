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
///<reference path='../OFXException'/>
///<reference path='../domain/data/investment/accounts/InvestmentAccountDetails'/>
///<reference path='../domain/data/investment/statements/InvestmentStatementResponse'/>
///<reference path='../domain/data/seclist/SecurityList'/>
///<reference path='../domain/data/seclist/SecurityListResponse'/>
///<reference path='../domain/data/seclist/SecurityRequest'/>
///<reference path='FinancialInstitutionAccount'/>

module ofx4js.client {

import OFXException = ofx4js.OFXException;
import InvestmentAccountDetails = ofx4js.domain.data.investment.accounts.InvestmentAccountDetails;
import InvestmentStatementResponse = ofx4js.domain.data.investment.statements.InvestmentStatementResponse;
import SecurityList = ofx4js.domain.data.seclist.SecurityList;
import SecurityListResponse = ofx4js.domain.data.seclist.SecurityListResponse;
import SecurityRequest = ofx4js.domain.data.seclist.SecurityRequest;

/**
 * @author Jon Perlow
 */
export interface InvestmentAccount extends FinancialInstitutionAccount {

  /**
   * Read an account statement.
   *
   * @param start The start date of the statement.
   * @param end The end date of the statement.
   * @throws OFXException if there's an error talking to the brokerage
   * @return The account statement.
   */
  // Overriden for type covariance
  readStatement(start: Date, end: Date) /*throws OFXException*/: Promise<InvestmentStatementResponse>;

  /**
   * Reads a list of securities from the brokerage
   *
   * @param securities the securities to read
   * @return The security response containing the security infos
   * @throws OFXException if there's an error talking to the brokerage
   */
  readSecurityList(securities: Array<SecurityRequest>) /*throws OFXException*/: Promise<SecurityList>;

  /**
   * The details of the account.
   *
   * @return The details of the account.
   */
  getDetails(): InvestmentAccountDetails;
}

}