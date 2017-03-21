function runCVReminderApp() {
    // 3. Tu última actualización de CV en glow reportada en la hoja de Talent Pool es X tiempo.
    new RemindWhenOldGlowCV().run();
    
    // 1. Estás en la hoja de Talent Pool con un Bench Start de más de 1 mes, y no estás en la hoja de Glober Bios.
    // 2. Estás en la hoja de Talent Pool con un Bench Start de más de 1 mes y estás en la hoja de Glober Bios con una actualización de CV de un mes o más.
    new RemindWhenBiosUpdateOld().run();
}