import { calculateResult } from "./App";

describe("Calculator function", () => {
  // All numbers in this array will be tested in combination with themselves as well as all others.
  const testNumbers = [0, 1, 3, 5, 9, 10, 12345];

  it("Should correctly perform addition", () => {
    testNumbers.forEach(firstOperand => {
      testNumbers.forEach(secondOperand => {
        const result = calculateResult(firstOperand, secondOperand, "add");

        expect(result).toStrictEqual(firstOperand + secondOperand);
      });
    });
  });

  it("Should correctly perform subtraction", () => {
    testNumbers.forEach(firstOperand => {
      testNumbers.forEach(secondOperand => {
        const result = calculateResult(firstOperand, secondOperand, "subtract");

        expect(result).toStrictEqual(firstOperand - secondOperand);
      });
    });
  });

  it("Should correctly perform multiplication", () => {
    testNumbers.forEach(firstOperand => {
      testNumbers.forEach(secondOperand => {
        const result = calculateResult(firstOperand, secondOperand, "multiply");

        expect(result).toStrictEqual(firstOperand * secondOperand);
      });
    });
  });

  it("Should correctly perform division", () => {
    testNumbers.forEach(firstOperand => {
      testNumbers.forEach(secondOperand => {
        const result = calculateResult(firstOperand, secondOperand, "divide");

        expect(result).toStrictEqual(firstOperand / secondOperand);
      });
    });
  });

  it("Should throw descriptive error if an invalid operator is provided", () => {
    const badOperator = "Invalid String";

    const badCall = () => {
      // @ts-ignore - Bad argument passed intentionally.
      calculateResult(1, 1, badOperator);
    };

    expect(badCall).toThrowError("Unrecognised operator: " + badOperator);
  });

  it("Should throw descriptive error if non numeric operands are provided", () => {
    const badOperands = ["string", null, undefined, true, {}, []];

    badOperands.forEach(operand => {
      const badCallFirstArgument = () => {
        // @ts-ignore - Bad argument passed intentionally.
        calculateResult(operand, 1, "add");
      };
      const badCallSecondArgument = () => {
        // @ts-ignore - Bad argument passed intentionally.
        calculateResult(1, operand, "add");
      };

      expect(badCallFirstArgument).toThrowError("Operands must be passed as type Number");
      expect(badCallSecondArgument).toThrowError("Operands must be passed as type Number");
    });
  });

  it("Should throw descriptive error if an unsafe number is provided", () => {
    const unsafeNumbers = [Number.MAX_SAFE_INTEGER + 1, Number.MIN_SAFE_INTEGER - 1, NaN];

    unsafeNumbers.forEach(number => {
      const badCallFirstArgument = () => {
        // @ts-ignore - Bad argument passed intentionally.
        calculateResult(number, 1, "add");
      };
      const badCallSecondArgument = () => {
        // @ts-ignore - Bad argument passed intentionally.
        calculateResult(1, number, "add");
      };

      expect(badCallFirstArgument).toThrowError("Unsafe number passed: " + number);
      expect(badCallSecondArgument).toThrowError("Unsafe number passed: " + number);
    });
  });
});
