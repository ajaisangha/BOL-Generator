import React from "react";

export default function BOLLayout({ mode, trailerNumber, sealNumber, qty, bolNumber }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-CA");
  const isOttawa = mode === "ottawa";

  const shipToLines = isOttawa
    ? ["OttawaSpoke", "2445 Don Reid Dr", "Ottawa, ON K1H 1E2"]
    : ["Etobicoke Spoke", "1561 The Queensway", "Etobicoke, ON M8Z 1T8"];

// Business rules
  const frames = Number(qty || 0);     // Handling unit qty
  const packages = frames * 20;        // Package qty
  const weight = frames + packages;    // Weight

  const carrierName = isOttawa ? "Canada Cartage" : "Sobeys Inc.";

  const commodityNotice =
    "Commodities requiring special or additional care or attention in handling or stowing must be so marked and packaged as to ensure safe transportation with ordinary care. See Section 2(e) of MNMFC Item 360.";

  return (
    <div
      className="bol-page page"
      style={{ fontFamily: '"Arial Narrow", Arial, sans-serif' }}
    >
      {/* ========== HEADER / ADDRESS BLOCK ========== */}
      <table
        className="bol-table"
        style={{ fontSize: "10px", width: "190mm", margin: "0 auto" }}
      >
        <tbody>
          {/* Row 1: Title + Date */}
          <tr>
            <td colSpan={8} style={{ verticalAlign: "top" }}>
              <div style={{ fontWeight: "bold" }}>Straight Bill of Lading</div>
              <div>Original - Not Negotiable</div>
            </td>
            <td colSpan={2} className="label-cell">
              Date:
            </td>
            <td colSpan={2}>{dateStr}</td>
          </tr>

          {/* Row 2: Ship From + BOL No */}
          <tr>
            <td className="label-cell" colSpan={7} style={{ width: "90mm" }}>
              Ship From:<br />
            
              Vaughan CFC
              <br />
              100 Gibraltar Road
              <br />
              Vaughan, ON L4H 3N5
              <br />
              <span className="label-cell">SID#&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <input type="checkbox" style={{ transform: "scale(0.8)" }} />{" "}
                  FOB
                </span>
            </td>
            <td colSpan={2} className="label-cell" style={{ width: "30mm" }}>
              Bill of Lading No:
            </td>
            <td colSpan={2} style={{ backgroundColor: "#ffff99", width: "70mm" }}>
              {bolNumber}
            </td>
          </tr>
         
          {/* Row 4: Ship To + Trailer No */}
          <tr>
            <td colSpan={7}>Ship To: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
              Location No:{shipToLines.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              <span className="label-cell">CID#&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <input type="checkbox" style={{ transform: "scale(0.8)" }} />{" "}
                  FOB
                </span>
            </td>
           
            <td colSpan={2} className="label-cell">
              Trailer No:
            </td>
            <td colSpan={2} style={{ backgroundColor: "#ffff99" }}>
              {trailerNumber}
            </td>
          </tr>
          {/* Row 6: Carrier / Trailer / Seal */}
          <tr>
            <td colSpan={2} className="label-cell">
              Carrier Name:
            </td>
            <td colSpan={4}>{carrierName}</td>
            <td colSpan={2} className="label-cell">
              Trailer No:
            </td>
            <td colSpan={1}>{trailerNumber}</td>
            <td className="label-cell">Seal Number(s):</td>
            <td colSpan={2} style={{ backgroundColor: "#ffff99" }}>
              {sealNumber}
            </td>
          </tr>

          <tr>
            <td colSpan={2} className="label-cell">
              SCAC:
            </td>
            <td colSpan={2}>CACG</td>
            <td colSpan={2} className="label-cell">
              Pro No:
            </td>
            <td colSpan={6}></td>
          </tr>
        </tbody>
      </table>

      {/* ========== FREIGHT TERMS / SPECIAL INSTRUCTIONS ========== */}
      <table
        className="bol-table"
        style={{
          fontSize: "9px",
          width: "190mm",
          margin: "2px auto 0 auto",
        }}
      >
        <tbody>
          <tr>
            <td className="label-cell" colSpan={4}>
              Freight Charge Terms (prepaid unless marked otherwise):
            </td>
            <td className="label-cell" colSpan={4}>
              Special Instructions:
            </td>
            <td colSpan={4} style={{ textAlign: "right" }}>
              <input
                type="checkbox"
                defaultChecked
                style={{ transform: "scale(0.8)" }}
              />{" "}
              Master BOL
            </td>
          </tr>

          <tr>
            <td colSpan={4}>
              <input
                type="checkbox"
                defaultChecked
                style={{ transform: "scale(0.8)" }}
              />{" "}
              Prepaid&nbsp;&nbsp;&nbsp;
              <input type="checkbox" style={{ transform: "scale(0.8)" }} />{" "}
              Collect&nbsp;&nbsp;&nbsp;
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> 3rd
              Party
            </td>

            {isOttawa ? (
              <td colSpan={8}>
                Voila CFC1 Departure Time :
                <br />
                Mileage Start :
                <br />
                Ottawa Spoke Arrival Time :
                <br />
                Mileage End :
                <br />
                Total Mileage :
              </td>
            ) : (
              <td colSpan={8}></td>
            )}
          </tr>
        </tbody>
      </table>

      {/* ========== COMMODITY TABLE (notice in Commodity Description sub-header row) ========== */}
      <table
        className="bol-table"
        style={{
          fontSize: "9px",
          width: "190mm",
          margin: "4px auto 0 auto",
        }}
      >
        <thead>
          {/* Group headers */}
          <tr>
            <th colSpan={2}>Handling Unit</th>
            <th colSpan={2}>Package</th>
            <th rowSpan={2} style={{ width: "18mm" }}>
              Wt. U.
              <br />
              (lbs)
            </th>
            <th rowSpan={2} style={{ width: "10mm" }}>
              H.M.
            </th>
            <th rowSpan={2} style={{ width: "80mm" }}>
              Commodity Description
              <tr
              style={{
                fontWeight: "normal",
                fontSize: "10px",
                borderTop: '1.5px solid black'
              }}
            >
              {commodityNotice}
            </tr>
            </th>
            
            <th colSpan={2}>LTL Only</th>
          </tr>

          {/* Sub headers */}
          <tr>
            <th style={{ width: "10mm" }}>QTY</th>
            <th style={{ width: "15mm" }}>Type</th>
            <th style={{ width: "10mm" }}>QTY</th>
            <th style={{ width: "15mm" }}>Type</th>
            <th style={{ width: "15mm" }}>NMFC No.</th>
            <th style={{ width: "15mm" }}>Class</th>
          </tr>

          
        </thead>

        <tbody>
          {/* Main commodity row */}
          <tr>
            <td className="center" style={{ backgroundColor: "#ffff99" }}>
              {frames || ""}
            </td>
            <td className="center">Frames</td>
            <td className="center">{frames ? packages : ""}</td>
            <td className="center">Totes</td>
            <td className="center">{frames || packages ? weight : ""}</td>
            <td></td>
            <td>Mixed grocery</td>
            <td></td>
            <td></td>
          </tr>

          {/* Two empty lines before totals */}
          <tr>
            <td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td>
          </tr>

          {/* Totals row */}
          <tr>
            <td className="center" style={{ backgroundColor: "#ffff99" }}>
              {frames || ""}
            </td>
            <td className="center">Frames</td>
            <td className="center">{frames ? packages : ""}</td>
            <td className="center">Totes</td>
            <td className="center">{frames || packages ? weight : ""}</td>
            <td></td>
            <td>Totals</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      {/* ========== DECLARED VALUE / SHIPPER SIGNATURE (upper) ========== */}
      <table
        className="bol-table"
        style={{
          fontSize: "9px",
          width: "190mm",
          margin: "4px auto 0 auto",
        }}
      >
        <tbody>
          <tr>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              Where the rate is dependent on value, shippers are required to
              state specifically in writing the agreed or declared value of the
              property as follows:
              
              <br />
              The agreed or declared value of the property is specifically
              stated by the shipper to be not exceeding
              <br />
              <br />
              _____________________________&nbsp;&nbsp;FOB&nbsp;_________________________
            </td>
            <td style={{ width: "50%", verticalAlign: "top" }}>
              The carrier shall not make delivery of this shipment without
              payment of freight and all other lawful charges.
              <br />
              <br />
              ________________________________________
              <br />
              Shipper Signature
            </td>
          </tr>
        </tbody>
      </table>

      {/* ========== LIABILITY NOTICE ========== */}
      <table
        className="bol-table"
        style={{
          fontSize: "8px",
          width: "190mm",
          margin: "4px auto 0 auto",
        }}
      >
        <tbody>
          <tr>
            <td>
              <strong>
                NOTE: Liability limitation for loss or damage in this shipment
                may be applicable. See 49 U.S.C. §14706(c)(1)(A) and (B).
              </strong>
              <br />
              RECEIVED, subject to individually determined rates or contracts
              that have been agreed upon in writing between the carrier and
              shipper, if applicable, otherwise to the rates, classifications
              and rules that have been established by the carrier and are
              available to the shipper on request. The property described above,
              in apparent good order, except as noted (contents and condition of
              contents of packages unknown), marked, consigned, and destined as
              shown above, which said carrier agrees to carry to destination, if
              on its route, or otherwise to deliver to another carrier on the
              route to destination. Every service to be performed hereunder
              shall be subject to all of the bill of lading terms and conditions
              in the governing classification on the date of shipment. Shipper
              hereby certifies that he is familiar with all the bill of lading
              terms and conditions in the governing classification and the said
              terms and conditions are hereby agreed to by the shipper and
              accepted for himself and his assigns.
            </td>
          </tr>
        </tbody>
      </table>

      {/* ========== TRAILER LOADED / FREIGHT COUNTED / CERTIFICATION ========== */}
      <table
        className="bol-table"
        style={{
          fontSize: "9px",
          width: "190mm",
          margin: "4px auto 0 auto",
        }}
      >
        <tbody>
          <tr>
            <td style={{ width: "35%", verticalAlign: "top" }}>
              This is to certify that the above named materials are properly
              classified, packaged, marked and labeled, and are in proper
              condition for transportation according to the applicable
              regulations of the DOT.
            </td>
            <td style={{ width: "22%", verticalAlign: "top" }}>
              <strong>Trailer Loaded</strong>
              <br />
              <input
                type="checkbox"
                defaultChecked
                style={{ transform: "scale(0.8)" }}
              />{" "}
              By Shipper
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Driver
            </td>
            <td style={{ width: "22%", verticalAlign: "top" }}>
              <strong>Freight Counted</strong>
              <br />
              <input
                type="checkbox"
                defaultChecked
                style={{ transform: "scale(0.8)" }}
              />{" "}
              By Shipper
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Driver / pallet said to contain
              <br />
              <input type="checkbox" style={{ transform: "scale(0.8)" }} /> By
              Driver / pieces
            </td>
            <td style={{ width: "21%", verticalAlign: "top" }}>
              Carrier acknowledges receipt of packages and required placards.
              Carrier certifies emergency response information was made
              available and/or carrier has the DOT emergency response guidebook
              or equivalent documentation in the vehicle. Property described
              above is received in good order, except as noted.
            </td>
          </tr>
        </tbody>
      </table>

      {/* ========== FINAL SIGNATURES (Option D) ========== */}
      <table
        className="bol-table"
        style={{
          fontSize: "9px",
          width: "190mm",
          margin: "4px auto 0 auto",
        }}
      >
        <tbody>
          <tr>
            {/* LEFT CELL: Shipper + Date side-by-side (short lines) */}
            <td style={{ width: "50%", verticalAlign: "top" }}>
              <div style={{ display: "flex", gap: "12mm" }}>
                <div>
                  _____________________
                  <br />
                  Shipper Signature
                </div>
                <div>
                  _____________________
                  <br />
                  Date: {dateStr}
                </div>
              </div>
            </td>

            {/* RIGHT CELL: Carrier + Pickup Date side-by-side (short lines) */}
            <td style={{ width: "50%", verticalAlign: "top" }}>
              <div style={{ display: "flex", gap: "12mm" }}>
                <div>
                  _____________________
                  <br />
                  Carrier Signature
                </div>
                <div>
                  _____________________
                  <br />
                  Pick up Date
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
