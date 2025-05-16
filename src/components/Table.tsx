import React from "react";
import { squadre } from "./types/squadraId";

const Table: React.FC = () => {
  return (
    <table className="table-auto md:table-fixed rounded-3xl ">
      <thead className="rounded outline-1">
        <tr>
          <th>Data</th>
          <th>PDL</th>
          <th>Preposto</th>
          <th>Capo Squadra</th>
          <th>Squadra ID</th>
          <th>M3 Montati</th>
          <th>Resa Minima</th>
          <th>Resa Aggiuntiva</th>
          <th>Resa Totale</th>
          <th>Verifica</th>
        </tr>
      </thead>
      <tbody className="outline-1 rounded">
        <tr className="">
          <td className="px-4 py-2">
            <input type="date" />
          </td>
          <td className="px-4 py-2">
            <input type="text" className="rounded outline"/>
          </td>
          <td className="px-4 py-2">
            <select name="Preposto" id="preposto" defaultValue="">
                <option value="" disabled>Seleziona</option>
                <option value="Antonio Alminara" >Antonio Alminara</option>
                <option value="Vincenzo Magnano" >Vincenzo Magnano</option>
                <option value="Marcello Matanza" >Marcello Matanza</option>
            </select>
          </td>
          <td>
            <select name="CapoSquadra" id="caposquadra" defaultValue="">
                <option value="" disabled>Seleziona</option>
                <option value="Calamoniere Sebastiano Roberto" >Calamoniere Sebastiano Roberto</option>
                <option value="Cosentino Nelson" >Cosentino Nelson</option>
                <option value="Magnano Carmelo" >Carmelo Magnano</option>
            </select>
          </td>
          <td>
            <select 
            name="SquadraID" 
            id={"squadraid"}
            onChange={(e) => {
              const squadraId = e.target.value;
              const squadra = squadre.find((squadra) => squadra.squadraId === squadraId);
              if (squadra) {
                console.log(squadra);
              }
            }}
            >
                <option value="">Seleziona una squadra</option>
                {squadre.map((squadra) => (
                    <option key={squadra.squadraId} value={squadra.squadraId}>
                        {squadra.squadraName}
                    </option>
                ))}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
