import React from "react";

export default function TempLayout({
  trailerNumber,
  supervisorName,
  initials,
  checks,
  issueTexts,
  temperature,
}) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-CA");
  const timeStr = today.toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const mark = (v) => (v === "yes" ? "✓" : "✗");

  const failedEntries = Object.entries(checks).filter(([, v]) => v === "no");
  const anyFailed = failedEntries.length > 0;

  const failureLines = anyFailed
    ? failedEntries
        .map(([key]) => {
          const num = key.replace("q", "");
          const text = issueTexts[key] || "";
          return `Failed ${num} – ${text}`;
        })
        .join("\n")
    : "";

  const formattedTemp = temperature ? `${temperature}°C` : "";

  return (
    <div className="temp-page page">
      <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
        Voilà Trailer Pre-Load Form
      </h2>

      <table className="bol-table">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}>DATE</td>
            <td>{dateStr}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Time</td>
            <td>{timeStr}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>Trailer #</td>
            <td>{trailerNumber}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", marginTop: "8px" }}>
        Does Van/Trailer comply with the following standards (✓ or ✗):
      </p>

      <table className="bol-table">
        <tbody>
          <tr><td>1</td><td>Incoming Trailer in Good Condition</td><td>{mark(checks.q1)}</td></tr>
          <tr><td>2</td><td>Cleanliness (No Contamination Risk from Dirt, Debris, Garbage, Damaged Pallets, etc.)</td><td>{mark(checks.q2)}</td></tr>
          <tr><td>3</td><td>Structural Concerns (No visible trailer damage or holes that can compromise product)</td><td>{mark(checks.q3)}</td></tr>
          <tr><td>4</td><td>No Indication and Free of Pest Infestation</td><td>{mark(checks.q4)}</td></tr>
          <tr><td>5</td><td>Within Temperature Range and No Signs of Temperature Abuse</td><td>{mark(checks.q5)}</td></tr>
          <tr><td>6</td><td>No Signs of Physical Damage to Product or Packaging</td><td>{mark(checks.q6)}</td></tr>
          <tr><td>7</td><td>No Signs and Free of Chemical Contamination and Other Contaminates</td><td>{mark(checks.q7)}</td></tr>
        </tbody>
      </table>

      <table className="bol-table" style={{ marginTop: "8px" }}>
        <thead>
          <tr>
            <th style={{ fontWeight: "bold" }}>Trailer #</th>
            <th style={{ fontWeight: "bold" }}>Temperature (°C)*</th>
            <th style={{ fontWeight: "bold" }}>Comply? (Y/N)</th>
            <th style={{ fontWeight: "bold" }}>If No, Indicate # from above</th>
            <th style={{ fontWeight: "bold" }}>Initials</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="center">{trailerNumber}</td>
            <td className="center">{formattedTemp}</td>
            <td className="center">{checks.q5 === "yes" ? "Y" : "N"}</td>
            <td className="center">{checks.q5 === "no" ? "5" : ""}</td>
            <td className="center">{initials}</td>
          </tr>

          {anyFailed && (
            <tr>
              <td className="center" style={{ fontWeight: "bold" }}>
                {trailerNumber}
              </td>
              <td className="center">—</td>
              <td className="center">N</td>
              <td
                className="center"
                style={{ whiteSpace: "pre-line", fontSize: "11px" }}
              >
                {failureLines}
              </td>
              <td className="center">{initials}</td>
            </tr>
          
          )}
          <tr>
            <td>&nbsp;</td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td>&nbsp;</td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", fontSize: "10px" }}>
        * Please always indicate a decimal for the temperature degrees Celsius.
      </p>

      <table className="bol-table">
        <tbody>
          <tr>
            <td style={{ fontWeight: "bold" }}>Supervisor Name</td>
            <td style={{ fontWeight: "bold" }}>{supervisorName}</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: "10px", marginTop: "8px" }}>
        1. Delivery trucks shall be pre-cooled to no greater than 4°C (40°F).
        Frozen products must be maintained safely.
        <br />
        <br />
        2. If a truck does not meet criteria, the shipper must contact the
        Outbound Supervisor:
        <br />
        • Supervisor must initial and confirm corrective action is complete.
      </p>
    </div>
  );
}
