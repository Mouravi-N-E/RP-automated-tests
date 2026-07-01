Feature: Tests for dassboards page

Background:
    Given I am logged in as a "default" user
    And I open "Mentoring Project" project
    And I am on the dashboards page

  Scenario: User can create a new dashboard
    Given I am on the dashboards page
    When I click on "Create New Dashboard"
    And I fill in "Dashboard Name" with "My New Dashboard"
    And I click on "Save"
    Then I should see "My New Dashboard" in the list of dashboards

#   Scenario: User can delete a dashboard
#     Given I am on the dashboards page
#     And I have a dashboard named "My New Dashboard"
#     When I click on "Delete" next to "My New Dashboard"
#     And I confirm the deletion
#     Then I should not see "My New Dashboard" in the list of dashboards