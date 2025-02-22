export interface IProblem {
  title: string;
  description: string;
  difficulty: string;
  testCases: ITestCase[];
  codeStubs?: ICodeStub[];
  editorial?: string;
}

interface ITestCase {
  testCaseId: string;
  input: string;
  output: string;
}

interface ICodeStub {
  language: {
    type: string;
    enum: ["CPP", "JAVASCRIPT"];
    required: boolean;
  };
  startSnippet: string;
  endSnippet: string;
  userSnippet: string;
}
