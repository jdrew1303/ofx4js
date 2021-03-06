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
///<reference path='../../../meta/ChildAggregate_add'/>
///<reference path='VersionSpecificMessageSetInfo'/>

module ofx4js.domain.data.profile {

import ChildAggregate_add = ofx4js.meta.ChildAggregate_add;

/**
 * Information about a message set.
 *
 * @author Ryan Heaton
 * @see "Section 7.2.1, OFX Spec"
 */
export /*abstract*/ class AbstractMessageSetInfo {

  private versionSpecificInformationList: Array<VersionSpecificMessageSetInfo>;

  /**
   * List of information about a message set for each version supported.
   *
   * @return List of information about a message set for each version supported.
   */
  public getVersionSpecificInformationList(): Array<VersionSpecificMessageSetInfo> {
    return this.versionSpecificInformationList;
  }

  /**
   * List of information about a message set for each version supported.
   *
   * @param versionSpecificInformationList List of information about a message set for each version supported.
   */
  public setVersionSpecificInformationList(versionSpecificInformationList: Array<VersionSpecificMessageSetInfo>): void {
    this.versionSpecificInformationList = versionSpecificInformationList;
  }
}

ChildAggregate_add(AbstractMessageSetInfo, { order: 0, type: Array, collectionEntryType: VersionSpecificMessageSetInfo, read: AbstractMessageSetInfo.prototype.getVersionSpecificInformationList, write: AbstractMessageSetInfo.prototype.setVersionSpecificInformationList });
}
