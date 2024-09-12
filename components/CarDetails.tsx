export class CarDetails {
    Id : number;
    Name: string;
    Manufacturer: string;
    Year: number;
    Model: string;
    Type: string;
    RarityByNumber: number;
    Rarity: string;
    Country: string;
    PI: string;
    PI__1: number;
    Speed: number;
    Handling: number;
    Acceleration: number;
    Launch: number;
    Braking: number;
    Offroad: number;
    AverageStat: number;
    Value: string;
    Classification: string;
    DLC: string;
  
    constructor(
      Id : number,
      Name: string,
      Manufacturer: string,
      Year: number,
      Model: string,
      Type: string,
      RarityByNumber: number,
      Rarity: string,
      Country: string,
      PI: string,
      PI__1: number,
      Speed: number,
      Handling: number,
      Acceleration: number,
      Launch: number,
      Braking: number,
      Offroad: number,
      AverageStat: number,
      Value: string,
      Classification: string,
      DLC: string
    ) {
      this.Id = Id,

      this.Name = Name;
      this.Manufacturer = Manufacturer;
      this.Year = Year;
      this.Model = Model;
      this.Type = Type;
      this.RarityByNumber = RarityByNumber;
      this.Rarity = Rarity;
      this.Country = Country;
      this.PI = PI;
      this.PI__1 = PI__1;
      this.Speed = Speed;
      this.Handling = Handling;
      this.Acceleration = Acceleration;
      this.Launch = Launch;
      this.Braking = Braking;
      this.Offroad = Offroad;
      this.AverageStat = AverageStat;
      this.Value = Value;
      this.Classification = Classification;
      this.DLC = DLC;
    }
  }