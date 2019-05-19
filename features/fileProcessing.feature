Feature: As a API user, I want to process files

  @file
  Scenario Outline: Transform file
    When I run the flow <flow> with the file <sourceFile> and save results to <resultFile>
    Then I should receive the result file <resultFile> with the same hash as for <expectedFile>

    Examples:
      | flow                          |     sourceFile    |      resultFile        | expectedFile              |
      | 'upperCase'                   |    'source.txt'   |    '1-result.txt'      |   '1-expected.txt'        |

