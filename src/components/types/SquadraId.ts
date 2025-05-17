export type SquadraId = {
  squadraId: string;
  squadraName: string;
  squadraElement: string[];
};

export const squadre: SquadraId[] = [
  {
    squadraId: "001",
    squadraName: "Squadra 1",
    squadraElement: ["ture", "pippo", "iano"],
  },
  {
    squadraId: "002",
    squadraName: "Squadra 2",
    squadraElement: ["alfio", "deffo", "cirino", "ignazio"],
  },
  {
    squadraId: "003",
    squadraName: "Squadra 3",
    squadraElement: ["ezio", "sgrizio", "fuzio", "sberzio", "saganzio"],
  },
  {
    squadraId: "004",
    squadraName: "Squadra 4",
    squadraElement: ["sganderfaif", "vudersgritch", "panzeghen"],
  },
];
