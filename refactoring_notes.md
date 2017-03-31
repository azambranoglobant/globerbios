* The SpreadsheetRepository now depends on a SpreadsheetAppService.
* The DriveRepository is no longer a module. Now it is a class that need instantiation.
* The PhotoRepository is no longer a module. Now it is a class that need instantiation.
* ReminderScenario now depends on: The TalentPoolRepo, The GloberBiosRepo, A TalentPoolEmail instance.
* ReminderScenario now requires getDaysDiffFromNow and merge functions from Utilities.