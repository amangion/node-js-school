Feature: As a API user, I want to process files

  @file
  Scenario Outline: Transform file
    Given a service with flow steps <flow>
    When I run the service execution with the file <sourceFile> and save results to <resultFile>
    Then I should receive the result file <resultFile> with the same hash as for <expectedFile>

    Examples:
      | flow                          |     sourceFile    |      resultFile        | expectedFile              |
      | 'upperCase'                   |    'source.txt'   |    '1-result.txt'      |   '1-expected.txt'        |
      | 'upperCase,removeSpaces'      |    'source.txt'   |    '2-result.txt'      |   '2-expected.txt'        |
      | 'lowerCase,gzip'              |    'source.txt'   |    '3-result.txt.gz'   |   '3-expected.txt.gz'     |
