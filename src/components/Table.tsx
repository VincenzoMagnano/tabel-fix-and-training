import React, { useState } from "react";
import { squadre, type SquadraId } from "./types/SquadraId";

interface RigaTabella {
  id: number;
  data: string;
  pdl: string;
  preposto: string;
  capoSquadra: string;
  squadraId: string;
  m3Montati: string;
  calcoliResa: CalcoliResaState;
}

interface CalcoliResaState {
  resaMinima: number;
  resaAggiuntiva: number;
  resaTotale: number;
  verificaResa: string;
}

const Table: React.FC = () => {
  const [righe, setRighe] = useState<RigaTabella[]>([
    {
      id: 1,
      data: "",
      pdl: "",
      preposto: "",
      capoSquadra: "",
      squadraId: "",
      m3Montati: "",
      calcoliResa: {
        resaMinima: 0,
        resaAggiuntiva: 0,
        resaTotale: 0,
        verificaResa: ""
      }
    }
  ]);
  
  const [contatoreId, setContatoreId] = useState(2);

  // Aggiunge una nuova riga alla tabella
  const aggiungiRiga = () => {
    const nuovaRiga: RigaTabella = {
      id: contatoreId,
      data: "",
      pdl: "",
      preposto: "",
      capoSquadra: "",
      squadraId: "",
      m3Montati: "",
      calcoliResa: {
        resaMinima: 0,
        resaAggiuntiva: 0,
        resaTotale: 0,
        verificaResa: ""
      }
    };
    
    setRighe([...righe, nuovaRiga]);
    setContatoreId(contatoreId + 1);
  };

  // Aggiorna una specifica riga
  const aggiornaRiga = <T extends keyof RigaTabella>(id: number, campo: T, valore: RigaTabella[T]) => {
    setRighe(righe.map(riga => {
      if (riga.id === id) {
        return { ...riga, [campo]: valore };
      }
      return riga;
    }));
  };

  // Aggiorna i calcoli della resa per una specifica riga
  const aggiornaCalcoliResa = (id: number, nuoviCalcoli: CalcoliResaState) => {
    setRighe(righe.map(riga => {
      if (riga.id === id) {
        return { ...riga, calcoliResa: nuoviCalcoli };
      }
      return riga;
    }));
  };

  // Gestisce il cambio della squadra per una specifica riga
  const handleSquadraChange = (id: number, e: React.ChangeEvent<HTMLSelectElement>): void => {
    const squadraId = e.target.value;
    aggiornaRiga(id, "squadraId", squadraId);
    
    const squadra = squadre.find((sq) => sq.squadraId === squadraId);
    if (squadra) {
      if (squadra.squadraElement && Array.isArray(squadra.squadraElement)) {
        const resaMinimaRichiesta = squadra.squadraElement.length * 30;
        aggiornaCalcoliResa(id, {
          resaMinima: resaMinimaRichiesta,
          resaAggiuntiva: 0,
          resaTotale: 0,
          verificaResa: ""
        });
      }

      const riga = righe.find(r => r.id === id);
      if (riga && riga.m3Montati) {
        calcolaRese(id, Number(riga.m3Montati), squadra);
      }
    }
  };

  // Gestisce il cambio del valore M3 montati per una specifica riga
  const handleM3Change = (id: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const valoreStringa = e.target.value;
    aggiornaRiga(id, "m3Montati", valoreStringa);
    
    const valoreNumerico = Number(valoreStringa);
    if (!isNaN(valoreNumerico)) {
      const riga = righe.find(r => r.id === id);
      if (riga) {
        const squadra = squadre.find(s => s.squadraId === riga.squadraId);
        if (squadra) {
          calcolaRese(id, valoreNumerico, squadra);
        }
      }
    }
  };

  // Funzione per calcolare le rese per una specifica riga
  const calcolaRese = (id: number, m3: number, squadra: SquadraId): void => {
    if (!squadra.squadraElement || !Array.isArray(squadra.squadraElement)) {
      console.error("Dati squadra non validi:", squadra);
      return;
    }

    const numeroElementi = squadra.squadraElement.length;
    const resaMinima = numeroElementi * 30;
    const resaAggiuntiva = m3 > resaMinima ? m3 - resaMinima : 0;
    const resaTotale = m3;
    const verificaResa = m3 >= resaMinima ? "Sufficiente" : "Insufficiente";

    aggiornaCalcoliResa(id, {
      resaMinima,
      resaAggiuntiva,
      resaTotale,
      verificaResa
    });
  };

  return (
    <div className="overflow-x-auto max-w-full p-2">
      
      
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">PDL</th>
            <th className="p-2 text-left">Preposto</th>
            <th className="p-2 text-left">Capo Squadra</th>
            <th className="p-2 text-left">Squadra ID</th>
            <th className="p-2 text-left">M3</th>
            <th className="p-2 text-left">Resa Min</th>
            <th className="p-2 text-left">Resa +</th>
            <th className="p-2 text-left">Resa Tot</th>
            <th className="p-2 text-left">Verifica</th>
          </tr>
        </thead>
        <tbody>
          {righe.map((riga) => (
            <tr key={riga.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <input 
                  type="date" 
                  className="w-full text-sm p-1 border rounded" 
                  value={riga.data}
                  onChange={(e) => aggiornaRiga(riga.id, "data", e.target.value)}
                />
              </td>
              <td className="p-2">
                <input 
                  type="text" 
                  className="w-full text-sm p-1 border rounded" 
                  value={riga.pdl}
                  onChange={(e) => aggiornaRiga(riga.id, "pdl", e.target.value)}
                />
              </td>
              <td className="p-2">
                <select 
                  name="Preposto" 
                  className="w-full text-sm p-1 border rounded" 
                  value={riga.preposto}
                  onChange={(e) => aggiornaRiga(riga.id, "preposto", e.target.value)}
                >
                  <option value="" disabled>Seleziona</option>
                  <option value="Antonio Alminara">Alminara A.</option>
                  <option value="Vincenzo Magnano">Magnano V.</option>
                  <option value="Marcello Matanza">Matanza M..</option>
                </select>
              </td>
              <td className="p-2">
                <select 
                  name="CapoSquadra" 
                  className="w-full text-sm p-1 border rounded" 
                  value={riga.capoSquadra}
                  onChange={(e) => aggiornaRiga(riga.id, "capoSquadra", e.target.value)}
                >
                  <option value="" disabled>Seleziona</option>
                  <option value="Calamoniere Sebastiano Roberto">Calamoniere S.R.</option>
                  <option value="Cosentino Nelson">Cosentino N.</option>
                  <option value="Magnano Carmelo">Magnano C.</option>
                </select>
              </td>
              <td className="p-2">
                <select 
                  name="SquadraID" 
                  className="w-full text-sm p-1 border rounded"
                  value={riga.squadraId}
                  onChange={(e) => handleSquadraChange(riga.id, e)}
                >
                  <option value="" disabled>Seleziona</option>
                  {squadre.map((squadra) => (
                    <option key={squadra.squadraId} value={squadra.squadraId}>
                      {squadra.squadraName.length > 15 
                        ? `${squadra.squadraName.substring(0, 15)}...` 
                        : squadra.squadraName}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <input 
                  type="number" 
                  className="w-full text-sm p-1 border rounded" 
                  value={riga.m3Montati}
                  onChange={(e) => handleM3Change(riga.id, e)}
                />
              </td>
              <td className="p-2">
                <input 
                  type="text" 
                  readOnly 
                  value={riga.calcoliResa.resaMinima.toFixed(2)}
                  className="w-full text-sm p-1 border rounded bg-gray-50" 
                />
              </td>
              <td className="p-2">
                <input 
                  type="text" 
                  readOnly 
                  value={riga.calcoliResa.resaAggiuntiva.toFixed(2)}
                  className="w-full text-sm p-1 border rounded bg-gray-50" 
                />
              </td>
              <td className="p-2">
                <input 
                  type="text" 
                  readOnly 
                  value={riga.calcoliResa.resaTotale.toFixed(2)}
                  className="w-full text-sm p-1 border rounded bg-gray-50" 
                />
              </td>
              <td className="p-2">
                <input 
                  type="text" 
                  readOnly 
                  value={riga.calcoliResa.verificaResa}
                  className="w-full text-sm p-1 border rounded bg-gray-50" 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={aggiungiRiga}
        className="mb-2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
      >
        Aggiungi Riga
      </button>
    </div>
  );
};

export default Table;
