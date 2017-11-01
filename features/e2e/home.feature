Feature: Home
  Scenario:
    Given I am logged in as "Yolo Jones"
    And I go to the home page
    Then I should see "Hello there Yolo Jones"
