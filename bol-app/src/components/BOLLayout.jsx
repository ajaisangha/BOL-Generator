import React from "react";

export default function BOLLayout({
  mode,
  trailerNumber,
  sealNumber,
  qty,
  bolNumber,
}) {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const yyyy = today.getFullYear();
  const dateStr = `${mm}/${dd}/${yyyy}`;

  const isOttawa = mode === "ottawa";

  const shipToLines = isOttawa
    ? ["OttawaSpoke", "2445 Don Reid Dr", "Ottawa, ON K1H 1E2"]
    : ["Etobicoke Spoke", "1561 The Queensway", "Etobicoke, ON M8Z 1T8"];

  const frames = Number(qty || 0);
  const packages = frames * 20;
  const weight = frames + packages;

  const carrierName = isOttawa ? "Canada Cartage" : "Sobeys Inc.";
  const commodityNotice =
    "Commodities requiring special or additional care or attention in handling or stowing must be so marked and packaged as to ensure safe transportation with ordinary care. See Section 2(e) of MNMFC Item 360.";

  const wheretherate =
    "Where the rate is dependent on value, shippers are required to state specifically in writing the agreed or declared value of the property as follows:";
  const theagreed =
    "The agreed or declared value of the property is specifically stated by the shipper to be not exceeding";
  const thecareershallnot =
    "The carrier shall not make delivery of this shipment without payment of freight and all other lawful charges.";
  const note =
    "NOTE: Liability limitation for loss or damage in this shipment may be applicable. See 49 U.S.C. - 14706(c)(1)(A) and (B).";
  const recieved =
    "RECEIVED, subject to individually determined rates or contracts that have been agreed upon in writing between the carrier and shipper, if applicable, otherwise to the rates, classifications and rules that have been established by the carrier and are available to the shipper on request. The property described above, in apparent good order, except as noted (contents and condition of contents of packages unknown), marked, consigned, and destined as shown above, which said carrier agrees to carry to destination, if on its route, or otherwise to deliver to another carrier on the route to destination. Every service to be performed hereunder shall be subject to all of the bill of lading terms and conditions in the governing classification on the date of shipment. Shipper hereby certifies that he is familiar with all the bill of lading terms and conditions in the governing classification and the said terms and conditions are hereby agreed to by the shipper and accepted for himself and his assigns.";
  const thisistocertify =
    "This is to certify that the above named materials are properly classified, packaged, marked and labeled, and are in proper condition for transportation according to the applicable regulations of the DOT.";
  const careeracknowledge =
    "Carrier acknowledges receipt of packages and required placards. Carrier certifies emergency response information was made available and/or carrier has the DOT emergency response guidebook or equivalent documentation in the vehicle. Property described above is received in good order, except as noted.";

  return (
    <div className="bol-page page">
      {/* MAIN OUTER TABLE */}
      <table className="bol-outer-table">
        <tbody>
          {/* ========================= BLOCK 1 ========================= */}
          <tr>
            <td>
              <table className="bol-inner-table">
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td colSpan={8}>
                      <div style={{ fontWeight: "bold" }}>
                        Straight Bill of Lading
                      </div>
                      <div>Original - Not Negotiable</div>
                    </td>
                    <td colSpan={3}>Date: &emsp;&emsp; {dateStr}</td>
                  </tr>

                  {/* Row 2 */}
                  <tr>
                    <td style={{ width: "70mm", verticalAlign: "top" }}>
                      <strong>Ship From:</strong>
                      <br />
                      Vaughan CFC
                      <br />
                      100 Gibraltar Road
                      <br />
                      Vaughan, ON L4H 3N5
                      <br />
                      SID# &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                      <input
                        type="checkbox"
                        style={{ transform: "scale(0.8)" }}
                      />{" "}
                      FOB
                    </td>

                    <td colSpan={10} style={{ verticalAlign: "top" }}>
                      <strong>Bill of Lading No:</strong> &emsp; {bolNumber}
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr>
                    <td style={{ width: "80mm", verticalAlign: "top" }}>
                      <strong>Ship To:</strong> &emsp;&emsp; Location No:
                      {shipToLines.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                      CID# &emsp;&emsp;&emsp;&emsp;&emsp;
                      <input
                        type="checkbox"
                        style={{ transform: "scale(0.8)" }}
                      />{" "}
                      FOB
                    </td>

                    <td colSpan={10} style={{ verticalAlign: "top" }}>
                      <strong>Carrier Name:</strong> &emsp; {carrierName}
                      <br />
                      <strong>Trailer No:</strong> &emsp; {trailerNumber}
                      <br />
                      <strong>Seal Number:</strong> &emsp; {sealNumber}
                      <div
                        style={{
                          borderBottom: "1px solid #000",
                          marginTop: "4px",
                        }}
                      ></div>
                      <strong>SCAC:</strong> &emsp; CACG
                      <br />
                      <strong>Pro No:</strong>
                      <div style={{ height: "30px" }}></div>
                    </td>
                  </tr>

                  {/* Row 4 */}
                  <tr>
                    <td colSpan={4} style={{ verticalAlign: "top" }}>
                      <strong>
                        Freight Charge Terms (prepaid unless marked otherwise):
                      </strong>
                      <br />
                      <input type="checkbox" defaultChecked /> Prepaid &nbsp;
                      <input type="checkbox" /> Collect &nbsp;
                      <input type="checkbox" /> 3rd Party
                      <div
                        style={{
                          borderTop: "1px solid #000",
                          marginTop: "6px",
                        }}
                      ></div>
                      3rd Party Freight Charges - Bill To:
                    </td>

                    <td colSpan={8} style={{ verticalAlign: "top" }}>
                      <strong>Special Instructions:</strong>
                      <span style={{ float: "right" }}>
                        <input type="checkbox" defaultChecked /> Master BOL
                      </span>
                      <br />
                      {isOttawa ? (
                        <>
                          Voila CFC1 Departure Time :
                          <br />
                          Mileage Start :
                          <br />
                          Ottawa Spoke Arrival Time :
                          <br />
                          Mileage End :
                          <br />
                          Total Mileage :
                        </>
                      ) : (
                        <div style={{ height: "85px" }}></div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ========================= BLOCK 2 ========================= */}
          <tr>
            <td>
              <table className="bol-inner-table">
                <tbody>
                  {/* Header */}
                  <tr style={{ fontWeight: "bold" }}>
                    <th colSpan={2}>Handling Unit</th>
                    <th colSpan={2}>Package</th>
                    <th rowSpan={2} style={{ width: "18mm" }}>
                      Wt. U.<br />
                      (lbs)
                    </th>
                    <th rowSpan={2} style={{ width: "10mm" }}>
                      H.M.
                    </th>
                    <th rowSpan={2} style={{ width: "80mm" }}>
                      Commodity Description
                      <div
                        style={{
                          fontWeight: "normal",
                          fontSize: "10pt", // commodityNotice only
                          borderTop: "1.5px solid black",
                        }}
                      >
                        {commodityNotice}
                      </div>
                    </th>
                    <th colSpan={2}>LTL Only</th>
                  </tr>

                  {/* Sub-header */}
                  <tr>
                    <th>QTY</th>
                    <th>Type</th>
                    <th>QTY</th>
                    <th>Type</th>
                    <th>NMFC No.</th>
                    <th>Class</th>
                  </tr>

                  {/* Main row */}
                  <tr>
                    <td
                      className="center"
                      style={{ backgroundColor: "#ffff99" }}
                    >
                      {frames}
                    </td>
                    <td className="center">Frames</td>
                    <td className="center">{frames ? packages : ""}</td>
                    <td className="center">Totes</td>
                    <td className="center">{frames ? weight : ""}</td>
                    <td></td>
                    <td>Mixed grocery</td>
                    <td></td>
                    <td></td>
                  </tr>

                  {/* Spacer */}
                  <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  {/* Totals */}
                  <tr>
                    <td
                      className="center"
                      style={{ backgroundColor: "#ffff99" }}
                    >
                      {frames}
                    </td>
                    <td className="center">Frames</td>
                    <td className="center">{frames ? packages : ""}</td>
                    <td className="center">Totes</td>
                    <td className="center">{frames ? weight : ""}</td>
                    <td></td>
                    <td>Totals</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ========================= BLOCK 3 ========================= */}
          <tr>
            <td>
              <table className="bol-inner-table">
                <tbody>
                  <tr>
                    <td colSpan={5} style={{ fontSize: "12pt" }}>
                      {wheretherate}
                      <br />
                      {theagreed}
                      <br />
                      <br />
                      _____________________________ FOB _________________________
                    </td>
                    <td colSpan={5} style={{ fontSize: "12pt" }}>
                      {thecareershallnot}
                      <div style={{ height: "30px" }}></div>
                      <br />
                      ________________________________________
                      <br />
                      Shipper Signature
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ========================= BLOCK 4 ========================= */}
          <tr>
            <td>
              <table className="bol-inner-table">
                <tbody>
                  <tr>
                    <td style={{ fontSize: "12pt" }}>
                      <strong>{note}</strong>
                      <div style={{ borderTop: "1.5px solid black" }}>
                        {recieved}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ========================= BLOCK 5 ========================= */}
          <tr>
            <td>
              <table className="bol-inner-table">
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "27%",
                        verticalAlign: "top",
                        fontSize: "12pt",
                      }}
                    >
                      {thisistocertify}
                      <div style={{ height: "30px" }}></div>
                      _____________________
                      <br />
                      Shipper Signature
                      <br />
                      Date: {dateStr}
                    </td>

                    <td
                      style={{
                        width: "35%",
                        verticalAlign: "top",
                        fontSize: "12pt",
                      }}
                    >
                      <strong>Trailer Loaded</strong>
                      <br />
                      <input type="checkbox" defaultChecked /> By Shipper
                      <br />
                      <input type="checkbox" /> By Driver
                      <br />
                      <br />
                      <strong>Freight Counted</strong>
                      <br />
                      <input type="checkbox" defaultChecked /> By Shipper
                      <br />
                      <input type="checkbox" /> By Driver / pallet said to contain
                      <br />
                      <input type="checkbox" /> By Driver / pieces
                    </td>

                    <td
                      style={{
                        width: "38%",
                        verticalAlign: "top",
                        fontSize: "12pt",
                      }}
                    >
                      {careeracknowledge}
                      <div style={{ height: "30px" }}></div>
                      _____________________
                      <br />
                      Carrier Signature
                      <br />
                      _____________________
                      <br />
                      Pick up Date
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
