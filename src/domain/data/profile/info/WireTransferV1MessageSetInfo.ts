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
///<reference path='../../../../meta/Aggregate_add'/>
///<reference path='../../../../meta/Element_add'/>
///<reference path='../../common/ProcessorDayOff'/>
///<reference path='../../profile/VersionSpecificMessageSetInfo'/>

module ofx4js.domain.data.profile.info {

import ProcessorDayOff = ofx4js.domain.data.common.ProcessorDayOff;
import VersionSpecificMessageSetInfo = ofx4js.domain.data.profile.VersionSpecificMessageSetInfo;
import MessageSetType = ofx4js.domain.data.MessageSetType;
import Aggregate_add = ofx4js.meta.Aggregate_add;
import Element_add = ofx4js.meta.Element_add;

/**
 * Wire Transfer Message Set Profile
 * @author Scott Priddy
 * @author Ryan Heaton
 * @see "Section 11.13.5 OFX Spec"
 */
export class WireTransferV1MessageSetInfo extends VersionSpecificMessageSetInfo {

  private processorDaysOff: Array<ProcessorDayOff>;
  private processEndTime: string;
  private supportsScheduledTransfers: boolean;
  private domesticWireTransferFee: number;
  private internationalWireTransferFee: number;

  public getMessageSetType(): MessageSetType {
    return MessageSetType.wire_transfer;
  }

  public getProcessorDaysOff(): Array<ProcessorDayOff> {
    return this.processorDaysOff;
  }

  public setProcessorDaysOff(processorDaysOff: Array<ProcessorDayOff>): void {
    this.processorDaysOff = processorDaysOff;
  }

  public getProcessEndTime(): string {
    return this.processEndTime;
  }

  public setProcessEndTime(processEndTime: string): void {
    this.processEndTime = processEndTime;
  }

  public getSupportsScheduledTransfers(): boolean {
    return this.supportsScheduledTransfers;
  }

  public setSupportsScheduledTransfers(supportsScheduledTransfers: boolean): void {
    this.supportsScheduledTransfers = supportsScheduledTransfers;
  }

  public getDomesticWireTransferFee(): number {
    return this.domesticWireTransferFee;
  }

  public setDomesticWireTransferFee(domesticWireTransferFee: number): void {
    this.domesticWireTransferFee = domesticWireTransferFee;
  }

  public getInternationalWireTransferFee(): number {
    return this.internationalWireTransferFee;
  }

  public setInternationalWireTransferFee(internationalWireTransferFee: number): void {
    this.internationalWireTransferFee = internationalWireTransferFee;
  }
}

Aggregate_add( WireTransferV1MessageSetInfo, "WIREXFERMSGSETV1" );
Element_add(WireTransferV1MessageSetInfo, { name: "PROCDAYSOFF", order: 10, type: Array, collectionEntryType: ProcessorDayOff, read: WireTransferV1MessageSetInfo.prototype.getProcessorDaysOff, write: WireTransferV1MessageSetInfo.prototype.setProcessorDaysOff });
Element_add(WireTransferV1MessageSetInfo, { name: "PROCENDTM", required: true, order: 20, type: String, read: WireTransferV1MessageSetInfo.prototype.getProcessEndTime, write: WireTransferV1MessageSetInfo.prototype.setProcessEndTime });
Element_add(WireTransferV1MessageSetInfo, { name: "CANSCHED", required: true, order: 30, type: Boolean, read: WireTransferV1MessageSetInfo.prototype.getSupportsScheduledTransfers, write: WireTransferV1MessageSetInfo.prototype.setSupportsScheduledTransfers });
Element_add(WireTransferV1MessageSetInfo, { name: "DOMXFERFEE", required: true, order: 40, type: Number, read: WireTransferV1MessageSetInfo.prototype.getDomesticWireTransferFee, write: WireTransferV1MessageSetInfo.prototype.setDomesticWireTransferFee });
Element_add(WireTransferV1MessageSetInfo, { name: "INTLXFERFEE", required: true, order: 50, type: Number, read: WireTransferV1MessageSetInfo.prototype.getInternationalWireTransferFee, write: WireTransferV1MessageSetInfo.prototype.setInternationalWireTransferFee });

}
