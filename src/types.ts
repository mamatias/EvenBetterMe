export interface Step {
    step: number;
    title: string;
    description: string;
    time_secs: number;
  }
  
  export interface Routine {
    id: number;
    name: string;
    description: string;
    steps: Step[];
  }
  