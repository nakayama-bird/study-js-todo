import './style.css'

const onClickAdd = () => {
  // 定数inputTextにadd-textのvalue(オブジェクト)を取得
  const inputText = document.getElementById("add-text").value;
  // テキストのボックスの内容を初期化する
  document.getElementById("add-text").value = "";

  // 未完了リストに追加
  createIncompleteTodo(inputText);

}

// 渡された引数を元に未完了のTODOを作成するための関数
const createIncompleteTodo = (todo) => {
     // li生成(HTMLの生成)
  const li = document.createElement("li");

  // divの生成
  const div = document.createElement("div");
  div.className = "list-low";

  // p生成
  const p = document.createElement("p");
  p.className = "todo-item"
  p.innerText = todo;

  // button(完了)タグ作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", ()=> {
    // 押された完了ボタンの親にあるliタグ配下に完了ボタンと削除ボタンを削除。常に参照している。
    const moveTarget = completeButton.closest("li");
    // 次に出てくる要素を取得する
    completeButton.nextElementSibling.remove();
    completeButton.remove();
    // 戻すボタンを生成してdivタグ配下に設定
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    // 戻すボタンの作成。自分で自分の関数を呼ぶ。
    backButton.addEventListener("click", ()=>{
      // todoの内容を取得して完了エリアにいそう
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      //押された戻すボタンの親のliタグを削除
      backButton.closest("li").remove();
    });
    // liタグの一番最初の要素を取得
    moveTarget.firstElementChild.appendChild(backButton);
    // 完了リストに移動。常に参照しているのでこれだけで良い！
    document.getElementById("complete-list").appendChild(moveTarget);
  });


  // button(削除)タグ作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", ()=> {
    // 押された削除ボタンの親にあるliタグを未完了リストから削除
    // deleteButtonから一番近いliを探す
    const deleteTarget = deleteButton.closest("li");
    // IDで要素を取得してからその子要素を削除する
    document.getElementById("incomplete-list").removeChild(deleteTarget);
  });
  

  // 階層構造を持ったDOM作成
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  li.appendChild(div);

  document.getElementById("incomplete-list").appendChild(li);
};

// docmentから"add-button"の要素を取得して、イベントリスナーでclickしたら何か加える
document.getElementById("add-button").addEventListener("click", onClickAdd);