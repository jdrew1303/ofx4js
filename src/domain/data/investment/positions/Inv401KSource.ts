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

module ofx4js.domain.data.investment.positions {

/**
 * Types of 401(k) sources.
 * @see "Section 13.9.2.4.2, OFX Spec"
 *
 * @author Jon Perlow
 */
export enum Inv401KSource {
  PRETAX,
  AFTER_TAX,
  MATCH,
  PROFIT_SHARING,
  ROLLOVER,
  OTHER_VEST,
  OTHER_NONVEST
}

interface MappingType {
  [key: string]: Inv401KSource;
}

var ofxMapping: MappingType = {
  "PRETAX": Inv401KSource.PRETAX,
  "AFTERTAX": Inv401KSource.AFTER_TAX,
  "MATCH": Inv401KSource.MATCH,
  "PROFITSHARING": Inv401KSource.PROFIT_SHARING,
  "ROLLOVER": Inv401KSource.ROLLOVER,
  "OTHERVEST": Inv401KSource.OTHER_VEST,
  "OTHERNONVEST": Inv401KSource.OTHER_NONVEST,
};

export function Inv401KSource_fromOfx(ofxVal: string): Inv401KSource {
  return ofxVal == null ? null : ofxMapping[ofxVal];
}

}
