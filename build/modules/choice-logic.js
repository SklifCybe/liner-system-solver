export const choiceLogic = async (commandLineInterface) => {
    console.log('Выберите способ работы программы:');
    console.log('1. Через терминал');
    console.log('2. Через файл');
    const choiceString = await commandLineInterface.question('Ваш выбор: ');
    const choice = Number(choiceString.trim());
    if (choice !== 1 && choice !== 2) {
        throw new Error('Ошибка выбора работы программы. Используйте только варианты 1 или 2.');
    }
    return choice;
};
//# sourceMappingURL=choice-logic.js.map